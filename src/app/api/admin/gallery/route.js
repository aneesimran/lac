import { NextResponse } from 'next/server';

let submissions = [
  {
    id: 'pov-1',
    name: 'Marcus T.',
    email: 'marcus.t@example.com',
    vehicle: '2023 Mercedes A35 AMG',
    media_url: 'https://vm.tiktok.com/ZNRpCdmsq/',
    note: 'Absolutely unreal job on the ambient lighting and turbine air vents.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'pov-2',
    name: 'Zack R.',
    email: 'zack.r@example.com',
    vehicle: 'BMW M135i xDrive',
    media_url: 'https://vm.tiktok.com/ZNRpCDpnV/',
    note: 'Starlight headliner with shooting stars. Cleanest install I have seen.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'pov-3',
    name: 'Devon K.',
    email: 'devon.k@example.com',
    vehicle: 'Tesla Model 3 Long Range',
    media_url: 'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/9z95g8d5_IMG_0180.MOV',
    note: 'Full ambient kit throughout the dash and center console.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: 'pov-4',
    name: 'Alex Turner',
    email: 'alex@example.com',
    vehicle: '2024 BMW M4 Competition',
    media_url: 'https://tiktok.com/@alex/video/123456789',
    note: 'Unbelievable starlight headliner, clean install and top lads in Rainham!',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(submissions);
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { id, status } = data;

    const item = submissions.find((s) => s.id === id);
    if (!item) {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    item.status = status;
    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update submission.' }, { status: 500 });
  }
}
