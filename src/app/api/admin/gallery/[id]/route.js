import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    return NextResponse.json({
      success: true,
      id,
      status,
      message: `Marked as ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update item.' },
      { status: 500 }
    );
  }
}
