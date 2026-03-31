import { cookies } from 'next/headers';

const SESSION_KEY = 'aleph_user';

export function setSession(userId: number) {
  cookies().set(SESSION_KEY, String(userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/'
  });
}

export function getSessionUserId() {
  const value = cookies().get(SESSION_KEY)?.value;
  const parsed = value ? Number(value) : NaN;
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}
