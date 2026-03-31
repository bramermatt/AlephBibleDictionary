import { SearchBar } from '@/components/SearchBar';

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <h1 className="mb-3 text-5xl font-semibold tracking-tight text-ink">Aleph</h1>
      <p className="mb-10 text-sm text-muted sm:text-base">Bible dictionary built for focused study.</p>
      <SearchBar autoFocus />
      <a
        href="/search"
        className="mt-4 inline-block rounded-md border border-ink px-5 py-2 text-sm font-semibold text-ink hover:bg-ink/10"
      >
        Open Search Page
      </a>
    </section>
  );
}
