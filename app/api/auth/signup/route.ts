import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  if (!body.email || !body.password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const userId = createUser(body.email, body.password);
    setSession(userId);
    return NextResponse.json({ message: 'Account created.' });
  } catch {
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 400 });
  }
}
