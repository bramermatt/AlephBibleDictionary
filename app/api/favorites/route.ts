import { NextResponse } from 'next/server';
import { getSessionUserId } from '@/lib/auth';
import { listFavorites, toggleFavorite } from '@/lib/db';

export async function GET() {
  const userId = getSessionUserId();
  if (!userId) return NextResponse.json({ favorites: [] });
  return NextResponse.json({ favorites: listFavorites(userId) });
}

export async function POST(request: Request) {
  const userId = getSessionUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json()) as { entryId?: number };
  if (!body.entryId) return NextResponse.json({ error: 'entryId required' }, { status: 400 });

  const favorited = toggleFavorite(body.entryId, userId);
  return NextResponse.json({ favorited });
}
