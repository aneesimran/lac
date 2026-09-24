import { NextResponse } from 'next/server';

let adminBookings = [
  {
    id: 'LAC-2026-8812',
    name: 'Tariq Mansoor',
    email: 'tariq.m@example.com',
    phone: '07412 889921',
    vehicle: '2023 BMW M3 Competition',
    service: 'Starlight Headliner',
    package: '1,000 Fibre Stars + Dual Shooting Constellation',
    date: '2026-10-02',
    time: '10:00 AM',
    deposit: 50.0,
    total: 550.0,
    status: 'paid',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'LAC-2026-8421',
    name: 'Jordan Bradley',
    email: 'jordan.b@example.com',
    phone: '07891 223344',
    vehicle: 'Mercedes-AMG A45 S',
    service: 'Ambient Lighting',
    package: '64-Colour Multi-Zone + Turbine Air Vents',
    date: '2026-10-03',
    time: '01:30 PM',
    deposit: 50.0,
    total: 350.0,
    status: 'paid',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'LAC-2026-7994',
    name: 'Chloe Evans',
    email: 'chloe.e@example.com',
    phone: '07734 556677',
    vehicle: 'Tesla Model Y Performance',
    service: 'Bespoke Combo',
    package: 'Starlight Roof + Center Console Ambient',
    date: '2026-10-05',
    time: '10:00 AM',
    deposit: 50.0,
    total: 750.0,
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'LAC-2026-7612',
    name: 'Liam Patterson',
    email: 'liam.p@example.com',
    phone: '07544 990011',
    vehicle: 'Audi RS6 Avant',
    service: 'Custom Parts & Coding',
    package: 'OEM Digital Cockpit Calibration',
    date: '2026-09-29',
    time: '11:00 AM',
    deposit: 50.0,
    total: 450.0,
    status: 'completed',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'LAC-2026-7108',
    name: 'Samir Patel',
    email: 'samir.p@example.com',
    phone: '07901 334455',
    vehicle: 'Volkswagen Golf R Mk8',
    service: 'Starlight Headliner',
    package: '600 Fibre Points Twinkle',
    date: '2026-10-08',
    time: '02:00 PM',
    deposit: 0.0,
    total: 420.0,
    status: 'pending_deposit',
    created_at: new Date(Date.now() - 3600000 * 60).toISOString(),
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status');

  if (statusFilter && statusFilter !== 'all') {
    const filtered = adminBookings.filter((b) => b.status === statusFilter);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(adminBookings);
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { id, status } = data;

    const booking = adminBookings.find((b) => b.id === id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    if (status) {
      booking.status = status;
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 });
  }
}
