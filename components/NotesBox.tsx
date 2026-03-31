'use client';

import { useEffect, useState } from 'react';

const keyFor = (entryWord: string) => `aleph-note:${entryWord.toLowerCase()}`;

export function NotesBox({ entryWord }: { entryWord: string }) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(keyFor(entryWord));
    if (savedValue) setNote(savedValue);
  }, [entryWord]);

  const save = () => {
    localStorage.setItem(keyFor(entryWord), note);
    setSaved(true);
    setTimeout(() => setSaved(false), 1000);
  };

  return (
    <section className="mt-10 rounded-2xl border border-line bg-white p-5 shadow-soft">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold">Personal notes</h2>
        <span className="text-xs text-muted">Future premium feature</span>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Capture sermon thoughts, lexical notes, or teaching outlines..."
        className="min-h-36 w-full rounded-xl border border-line p-3 text-sm outline-none ring-indigo-100 focus:ring"
      />
      <button
        onClick={save}
        className="mt-3 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        {saved ? 'Saved' : 'Save note'}
      </button>
    </section>
  );
}
