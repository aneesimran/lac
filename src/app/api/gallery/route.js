import { NextResponse } from 'next/server';

// In-memory submissions store with initial customer POV items
let customerSubmissions = [
  {
    id: 'pov-1',
    name: 'Marcus T.',
    vehicle: '2023 Mercedes A35 AMG',
    media_url: 'https://vm.tiktok.com/ZNRpCdmsq/',
    note: 'Absolutely unreal job on the ambient lighting and turbine air vents. Night drives are completely transformed!',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'pov-2',
    name: 'Zack R.',
    vehicle: 'BMW M135i xDrive',
    media_url: 'https://vm.tiktok.com/ZNRpCDpnV/',
    note: 'Starlight headliner with shooting stars. Cleanest install I have seen, zero sag or loose wires.',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'pov-3',
    name: 'Devon K.',
    vehicle: 'Tesla Model 3 Long Range',
    media_url: 'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/9z95g8d5_IMG_0180.MOV',
    note: 'Full ambient kit throughout the dash and center console. Looks totally OEM from factory.',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: 'pov-4',
    name: 'Haris M.',
    vehicle: 'Audi RS3 Sportback',
    media_url: 'https://vm.tiktok.com/ZNRpC2uuX/',
    note: 'Took 3 hours in Rainham while I worked in their customer lounge. Best money spent on the car.',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(customerSubmissions);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, vehicle, media_url, note, booking_id } = data;

    if (!name || !email || !media_url) {
      return NextResponse.json(
        { error: 'Name, email, and media link are required.' },
        { status: 400 }
      );
    }

    const newSubmission = {
      id: `pov-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      vehicle: vehicle ? vehicle.trim() : null,
      media_url: media_url.trim(),
      note: note ? note.trim() : null,
      booking_id: booking_id || null,
      created_at: new Date().toISOString(),
    };

    customerSubmissions.unshift(newSubmission);

    return NextResponse.json({ success: true, submission: newSubmission }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process submission.' },
      { status: 500 }
    );
  }
}
