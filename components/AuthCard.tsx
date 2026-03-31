'use client';

import { useState } from 'react';

export function AuthCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (mode: 'login' | 'signup') => {
    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = (await res.json()) as { message?: string; error?: string };
    setMessage(data.message ?? data.error ?? 'Done');
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-line p-5 shadow-soft">
      <h2 className="text-lg font-semibold">Account</h2>
      <p className="mb-4 text-sm text-muted">Sign in to save favorites and synced notes.</p>
      <input
        className="mb-2 w-full rounded-lg border border-line p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="mb-3 w-full rounded-lg border border-line p-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={() => submit('login')} className="rounded-lg bg-ink px-3 py-2 text-sm text-white">
          Login
        </button>
        <button onClick={() => submit('signup')} className="rounded-lg border border-line px-3 py-2 text-sm">
          Sign up
        </button>
      </div>
      {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}
    </section>
  );
}
