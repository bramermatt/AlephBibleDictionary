import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NotesBox } from '@/components/NotesBox';
import { ReferenceText } from '@/components/ReferenceText';
import { AuthCard } from '@/components/AuthCard';
import { getEntryByWord } from '@/lib/db';

export default function EntryPage({ params }: { params: { word: string } }) {
  const word = decodeURIComponent(params.word);
  const entry = getEntryByWord(word);

  if (!entry) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link href="/search" className="mb-6 inline-block text-sm text-muted hover:text-ink">
        ← Back to search
      </Link>
      <header className="mb-8 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{entry.word}</h1>
      </header>
      <section className="max-w-prose text-lg font-serif">
        <ReferenceText text={entry.definition} />
      </section>
      <NotesBox entryWord={entry.word} />
      <AuthCard />
    </article>
  );
}
