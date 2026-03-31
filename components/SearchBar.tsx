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
      <div className="rounded-2xl border border-line bg-panel shadow-soft transition hover:shadow-md">
        <input
          id="term"
          name="term"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus={autoFocus}
          placeholder="Search a word (e.g., covenant, grace, Zion)"
          className="w-full rounded-2xl bg-transparent px-6 py-4 text-lg outline-none placeholder:text-muted"
        />
      </div>
    </form>
  );
}
