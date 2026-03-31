import { NextResponse } from 'next/server';
import { getSessionUserId } from '@/lib/auth';
import { upsertNote } from '@/lib/db';

export async function POST(request: Request) {
  const userId = getSessionUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json()) as { entryId?: number; content?: string };
  if (!body.entryId || typeof body.content !== 'string') {
    return NextResponse.json({ error: 'entryId and content required' }, { status: 400 });
  }

  upsertNote(body.entryId, body.content, userId);
  return NextResponse.json({ message: 'Note saved' });
}
