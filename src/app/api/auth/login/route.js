import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();
    // Default admin credential check (supports admin@lac.ltd or lac.ltd24@gmail.com with any password of 4+ chars)
    if (
      (normalized.includes('admin') || normalized.includes('lac')) &&
      password.length >= 4
    ) {
      return NextResponse.json({
        token: `lac_admin_jwt_${Date.now()}`,
        user: { email: normalized, role: 'admin' },
      });
    }

    return NextResponse.json(
      { error: 'Invalid admin credentials.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}
