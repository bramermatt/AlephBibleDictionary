import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-3 text-3xl font-semibold">Entry not found</h1>
      <p className="mb-6 text-muted">Try another search term.</p>
      <Link href="/" className="rounded-lg bg-ink px-4 py-2 text-white">
        Go home
      </Link>
    </section>
  );
}
