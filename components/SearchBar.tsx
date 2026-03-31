'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function SearchBar({ initial = '', autoFocus = false }: { initial?: string; autoFocus?: boolean }) {
  const [query, setQuery] = useState(initial);
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl">
      <label htmlFor="term" className="sr-only">
        Search Bible Dictionary
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel p-1 shadow-soft transition hover:shadow-md">
        <input
          id="term"
          name="term"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus={autoFocus}
          placeholder="Search a word (e.g., covenant, grace, Zion)"
          className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-lg outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-dark"
        >
          Search
        </button>
      </div>
    </form>
  );
}
