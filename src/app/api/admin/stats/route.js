import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total: 18,
    by_status: {
      paid: 9,
      confirmed: 5,
      completed: 3,
      pending_deposit: 1,
      cancelled: 0,
    },
    revenue: {
      deposits_collected: 850.0,
      total_pipeline: 8900.0,
    },
  });
}
