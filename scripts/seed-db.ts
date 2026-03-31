import { getDb } from '@/lib/db';

const seedEntries = [
  {
    word: 'Atonement',
    definition:
      'The reconciliation of God and humanity through sacrifice, fulfilled in Christ. See Romans 5:1 for gospel peace.'
  },
  {
    word: 'Faith',
    definition:
      'Saving trust in God and His promises, grounded in revelation and fulfilled in Christ Jesus.'
  },
  {
    word: 'Jerusalem',
    definition:
      'Historic city of David and center of Temple worship; central in biblical prophecy and redemptive history.'
  }
];

const db = getDb();
const stmt = db.prepare('INSERT OR IGNORE INTO entries (word, definition) VALUES (?, ?)');

for (const entry of seedEntries) {
  stmt.run(entry.word, entry.definition);
}

console.log(`Seeded ${seedEntries.length} entries.`);
