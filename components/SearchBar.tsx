export function SearchBar({ initial = '', autoFocus = false }: { initial?: string; autoFocus?: boolean }) {
  return (
    <form action="/search" method="get" className="w-full max-w-2xl">
      <label htmlFor="term" className="sr-only">
        Search Bible Dictionary
      </label>
      <div className="rounded-2xl border border-line bg-panel shadow-soft transition hover:shadow-md">
        <input
          id="term"
          name="q"
          defaultValue={initial}
          autoFocus={autoFocus}
          placeholder="Search a word (e.g., covenant, grace, Zion)"
          className="w-full rounded-2xl bg-transparent px-6 py-4 text-lg outline-none placeholder:text-muted"
        />
      </div>
    </form>
  );
}
