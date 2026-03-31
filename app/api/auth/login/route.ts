import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/db';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  if (!body.email || !body.password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const userId = authenticateUser(body.email, body.password);
  if (!userId) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }
  setSession(userId);
  return NextResponse.json({ message: 'Logged in.' });
}
