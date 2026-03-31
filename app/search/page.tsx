import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { searchEntries } from '@/lib/db';

export default function SearchPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q ?? '').trim();
  const results = q ? searchEntries(q) : [];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-3">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back to home
        </Link>
        <SearchBar initial={q} />
      </div>
      {q ? (
        <p className="mb-6 text-sm text-muted">
          {results.length} result{results.length === 1 ? '' : 's'} for “{q}”
        </p>
      ) : (
        <p className="mb-6 text-sm text-muted">Type a word to begin searching.</p>
      )}
      <div className="space-y-4">
        {results.map((entry) => (
          <Link
            key={entry.id}
            href={`/entry/${encodeURIComponent(entry.word)}`}
            className="block rounded-2xl border border-line bg-white p-5 transition hover:border-slate-300 hover:shadow-soft"
          >
            <h2 className="mb-1 text-xl font-semibold tracking-tight">{entry.word}</h2>
            <p className="line-clamp-2 text-sm leading-6 text-muted">{entry.definition}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
