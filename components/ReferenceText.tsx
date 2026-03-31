'use client';

import { useMemo, useState } from 'react';
import { getVerse } from '@/lib/reference';

const referenceRegex = /\b([1-3]?\s?[A-Za-z]+\s\d{1,3}:\d{1,3})\b/g;

export function ReferenceText({ text }: { text: string }) {
  const [activeRef, setActiveRef] = useState<string | null>(null);

  const parts = useMemo(() => {
    const result: Array<{ text: string; ref?: string }> = [];
    let lastIndex = 0;

    text.replace(referenceRegex, (match, ref, offset) => {
      if (offset > lastIndex) {
        result.push({ text: text.slice(lastIndex, offset) });
      }
      result.push({ text: match, ref });
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex) });
    }

    return result;
  }, [text]);

  const verse = activeRef ? getVerse(activeRef) : null;

  return (
    <div className="relative">
      <p className="whitespace-pre-wrap leading-8 text-ink/95">
        {parts.map((part, i) =>
          part.ref ? (
            <button
              key={`${part.ref}-${i}`}
              onClick={() => setActiveRef(part.ref ?? null)}
              className="rounded px-1 text-indigo-700 underline decoration-indigo-300 underline-offset-4 hover:bg-indigo-50"
            >
              {part.text}
            </button>
          ) : (
            <span key={`text-${i}`}>{part.text}</span>
          )
        )}
      </p>
      {activeRef && (
        <aside className="mt-4 rounded-xl border border-line bg-white p-4 text-sm text-ink shadow-soft">
          <div className="mb-2 flex items-center justify-between">
            <strong>{activeRef}</strong>
            <button onClick={() => setActiveRef(null)} className="text-muted hover:text-ink">
              Close
            </button>
          </div>
          <p>{verse?.text ?? 'Verse preview unavailable in sample set.'}</p>
        </aside>
      )}
    </div>
  );
}
