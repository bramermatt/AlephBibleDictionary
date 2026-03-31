import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getDb } from '@/lib/db';

type ParsedEntry = {
  word: string;
  definition: string;
};

function normalizeWord(word: string) {
  return word
    .replace(/^\s+|\s+$/g, '')
    .replace(/[._]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^"|"$/g, '');
}

function cleanDefinition(definition: string) {
  return definition
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function parseEaston(raw: string): ParsedEntry[] {
  const chunks = raw.split(/\n\n+/);
  const entries: ParsedEntry[] = [];

  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    const head = normalizeWord(lines[0]);
    const definition = cleanDefinition(lines.slice(1).join(' '));
    if (!head || !definition) continue;

    entries.push({ word: head, definition });
  }

  return entries;
}

const source = process.argv[2] ?? path.join(process.cwd(), 'data', 'easton.txt');
const raw = readFileSync(source, 'utf-8');
const entries = parseEaston(raw);

const db = getDb();
const insert = db.prepare('INSERT OR REPLACE INTO entries (word, definition) VALUES (?, ?)');
const tx = db.transaction((items: ParsedEntry[]) => {
  for (const entry of items) {
    insert.run(entry.word, entry.definition);
  }
});

tx(entries);
console.log(`Imported ${entries.length} Easton entries from ${source}.`);
