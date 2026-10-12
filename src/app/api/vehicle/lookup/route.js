import { NextResponse } from 'next/server';

function formatMake(make) {
  if (!make) return 'Vehicle';
  const upper = make.toUpperCase().trim();
  const acronyms = ['BMW', 'AMG', 'VW', 'KTM', 'MINI', 'MG', 'SEAT'];
  if (acronyms.includes(upper)) return upper;
  
  if (upper === 'MERCEDES-BENZ' || upper === 'MERCEDES') return 'Mercedes-Benz';
  if (upper === 'LAND ROVER' || upper === 'LANDROVER') return 'Land Rover';
  if (upper === 'ASTON MARTIN') return 'Aston Martin';
  if (upper === 'ALFA ROMEO') return 'Alfa Romeo';
  if (upper === 'ROLLS-ROYCE' || upper === 'ROLLS ROYCE') return 'Rolls-Royce';

  return upper
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatColour(colour) {
  if (!colour) return '';
  return colour.charAt(0).toUpperCase() + colour.slice(1).toLowerCase();
}

const sampleFallbackCars = {
  BD51SMR: { make: 'BMW', year: 2021, colour: 'Misano Blue', fuel: 'Petrol', engine_cc: 1998, mot_status: 'Valid', tax_status: 'Taxed' },
  LC70XYZ: { make: 'Mercedes-Benz', year: 2020, colour: 'Cosmos Black', fuel: 'Petrol', engine_cc: 1991, mot_status: 'Valid', tax_status: 'Taxed' },
  TS22TES: { make: 'Tesla', year: 2022, colour: 'Pearl White', fuel: 'Electric', engine_cc: null, mot_status: 'Valid', tax_status: 'Taxed' },
  RO21RVR: { make: 'Land Rover', year: 2021, colour: 'Santorini Black', fuel: 'Diesel', engine_cc: 2996, mot_status: 'Valid', tax_status: 'Taxed' },
  AU19AUD: { make: 'Audi', year: 2019, colour: 'Nardo Grey', fuel: 'Petrol', engine_cc: 2480, mot_status: 'Valid', tax_status: 'Taxed' },
  VW23GLF: { make: 'Volkswagen', year: 2023, colour: 'Lapiz Blue', fuel: 'Petrol', engine_cc: 1984, mot_status: 'Valid', tax_status: 'Taxed' },
};

async function queryDvlaService(cleanReg) {
  // 1. Official DVLA VES API (if API key provided in environment)
  if (process.env.DVLA_API_KEY) {
    try {
      const vesRes = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.DVLA_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber: cleanReg }),
        cache: 'no-store',
      });

      if (vesRes.status === 200) {
        const d = await vesRes.json();
        return {
          found: true,
          data: {
            reg: d.registrationNumber || cleanReg,
            make: d.make,
            year: d.yearOfManufacture,
            colour: d.colour,
            fuel: d.fuelType,
            engine_cc: d.engineCapacity,
            mot_status: d.motStatus === 'No details held by DVLA' ? 'Unknown' : d.motStatus,
            tax_status: d.taxStatus,
          },
        };
      }
      if (vesRes.status === 404) {
        return { found: false, notFound: true };
      }
    } catch (e) {
      console.warn('Official DVLA VES check failed, falling back:', e.message);
    }
  }

  // 2. Query live LAC DVLA database proxy
  try {
    const liveRes = await fetch('https://lac-ltd.co.uk/api/vehicle/lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'LAC-DVLA-Client/1.0',
      },
      body: JSON.stringify({ reg: cleanReg }),
      cache: 'no-store',
    });

    if (liveRes.status === 200) {
      const liveData = await liveRes.json();
      return { found: true, data: liveData };
    }
    if (liveRes.status === 404 || liveRes.status === 502 || liveRes.status === 422) {
      return { found: false, notFound: true };
    }
  } catch (err) {
    console.warn('Live DVLA lookup request error:', err.message);
  }

  // 3. Check fallback dataset for test plates
  if (sampleFallbackCars[cleanReg]) {
    return { found: true, data: { reg: cleanReg, ...sampleFallbackCars[cleanReg] } };
  }

  return { found: false, unavailable: true };
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawReg = body.reg || body.registration || '';
    const cleanReg = rawReg.toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!cleanReg || cleanReg.length < 2) {
      return NextResponse.json(
        { detail: 'string_too_short', error: 'Please enter a valid UK registration number.' },
        { status: 400 }
      );
    }

    const result = await queryDvlaService(cleanReg);

    if (result.found && result.data) {
      const raw = result.data;
      const displayMake = formatMake(raw.make);
      const displayColour = raw.colour ? formatColour(raw.colour) : '';
      const year = raw.year || '';
      const summary = [displayMake, year, displayColour].filter(Boolean).join(' · ');

      return NextResponse.json({
        reg: cleanReg,
        make: displayMake,
        rawMake: raw.make,
        year: year,
        colour: displayColour,
        fuel: raw.fuel || 'Petrol',
        engine_cc: raw.engine_cc || null,
        mot_status: raw.mot_status || 'Valid',
        tax_status: raw.tax_status || 'Taxed',
        summary,
      });
    }

    if (result.notFound) {
      return NextResponse.json(
        { detail: 'vehicle_not_found', error: "Couldn't find that reg on DVLA." },
        { status: 404 }
      );
    }

    // Service unavailable fallback
    return NextResponse.json(
      { detail: 'lookup_unavailable', error: 'DVLA lookup service temporarily unavailable.' },
      { status: 503 }
    );
  } catch (err) {
    console.error('Vehicle lookup API error:', err);
    return NextResponse.json(
      { detail: 'server_error', error: 'An unexpected error occurred during vehicle lookup.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawReg = searchParams.get('reg') || searchParams.get('registration') || '';
  const cleanReg = rawReg.toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (!cleanReg || cleanReg.length < 2) {
    return NextResponse.json(
      { detail: 'string_too_short', error: 'Please enter a valid UK registration number.' },
      { status: 400 }
    );
  }

  const result = await queryDvlaService(cleanReg);

  if (result.found && result.data) {
    const raw = result.data;
    const displayMake = formatMake(raw.make);
    const displayColour = raw.colour ? formatColour(raw.colour) : '';
    const year = raw.year || '';
    const summary = [displayMake, year, displayColour].filter(Boolean).join(' · ');

    return NextResponse.json({
      reg: cleanReg,
      make: displayMake,
      rawMake: raw.make,
      year: year,
      colour: displayColour,
      fuel: raw.fuel || 'Petrol',
      engine_cc: raw.engine_cc || null,
      mot_status: raw.mot_status || 'Valid',
      tax_status: raw.tax_status || 'Taxed',
      summary,
    });
  }

  if (result.notFound) {
    return NextResponse.json(
      { detail: 'vehicle_not_found', error: "Couldn't find that reg on DVLA." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { detail: 'lookup_unavailable', error: 'DVLA lookup service temporarily unavailable.' },
    { status: 503 }
  );
}
