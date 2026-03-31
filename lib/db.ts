import Database from 'better-sqlite3';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import type { Entry } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'aleph.sqlite');
const mockEntriesPath = path.join(process.cwd(), 'data', 'mockEntries.json');

let db: Database.Database | null = null;
let sqliteUnavailable = false;

function searchMockEntries(term: string): Entry[] {
  const rows = JSON.parse(readFileSync(mockEntriesPath, 'utf-8')) as Array<Pick<Entry, 'word' | 'definition'>>;
  const normalized = term.toLowerCase();
  return rows
    .filter(
      (row) => row.word.toLowerCase().includes(normalized) || row.definition.toLowerCase().includes(normalized)
    )
    .slice(0, 50)
    .map((row, index) => ({ id: index + 1, ...row }));
}

function getDb() {
  if (sqliteUnavailable) {
    throw new Error('SQLite unavailable in this runtime.');
  }
  if (!db) {
    try {
      db = new Database(DB_PATH);
      db.pragma('journal_mode = WAL');
      initialize(db);
    } catch (error) {
      sqliteUnavailable = true;
      throw error;
    }
  }
  return db;
}

function initialize(conn: Database.Database) {
  conn.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL UNIQUE,
      definition TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      entry_id INTEGER NOT NULL,
      UNIQUE(user_id, entry_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (entry_id) REFERENCES entries(id)
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      entry_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, entry_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (entry_id) REFERENCES entries(id)
    );
  `);

  const count = conn.prepare('SELECT COUNT(*) AS total FROM entries').get() as { total: number };
  if (count.total === 0) {
    const rows = JSON.parse(readFileSync(mockEntriesPath, 'utf-8')) as Array<Pick<Entry, 'word' | 'definition'>>;
    const stmt = conn.prepare('INSERT INTO entries (word, definition) VALUES (@word, @definition)');
    const tx = conn.transaction((items) => {
      for (const item of items) stmt.run(item);
    });
    tx(rows);
  }
}

export function hashPassword(password: string) {
  return createHash('sha256').update(password).digest('hex');
}

export function createUser(email: string, password: string) {
  const conn = getDb();
  const hash = hashPassword(password);
  const result = conn
    .prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)')
    .run(email.toLowerCase().trim(), hash);
  return result.lastInsertRowid as number;
}

export function authenticateUser(email: string, password: string) {
  const conn = getDb();
  const row = conn
    .prepare('SELECT id, password_hash FROM users WHERE email = ?')
    .get(email.toLowerCase().trim()) as { id: number; password_hash: string } | undefined;
  if (!row || row.password_hash !== hashPassword(password)) return null;
  return row.id;
}

export function searchEntries(term: string): Entry[] {
  try {
    const conn = getDb();
    return conn
      .prepare(
        'SELECT id, word, definition FROM entries WHERE word LIKE ? OR definition LIKE ? ORDER BY word ASC LIMIT 50'
      )
      .all(`%${term}%`, `%${term}%`) as Entry[];
  } catch {
    return searchMockEntries(term);
  }
}

export function getEntryByWord(word: string): Entry | undefined {
  try {
    const conn = getDb();
    return conn
      .prepare('SELECT id, word, definition FROM entries WHERE lower(word) = lower(?)')
      .get(word) as Entry | undefined;
  } catch {
    return searchMockEntries(word).find((entry) => entry.word.toLowerCase() === word.toLowerCase());
  }
}

export function getEntryById(id: number): Entry | undefined {
  const conn = getDb();
  return conn.prepare('SELECT id, word, definition FROM entries WHERE id = ?').get(id) as Entry | undefined;
}

export function upsertNote(entryId: number, content: string, userId?: number) {
  const conn = getDb();
  conn
    .prepare(
      `INSERT INTO notes (user_id, entry_id, content)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, entry_id) DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP`
    )
    .run(userId ?? null, entryId, content);
}

export function toggleFavorite(entryId: number, userId: number) {
  const conn = getDb();
  const existing = conn
    .prepare('SELECT id FROM favorites WHERE entry_id = ? AND user_id = ?')
    .get(entryId, userId) as { id: number } | undefined;
  if (existing) {
    conn.prepare('DELETE FROM favorites WHERE id = ?').run(existing.id);
    return false;
  }
  conn.prepare('INSERT INTO favorites (entry_id, user_id) VALUES (?, ?)').run(entryId, userId);
  return true;
}

export function listFavorites(userId: number): Entry[] {
  const conn = getDb();
  return conn
    .prepare(
      `SELECT e.id, e.word, e.definition
       FROM entries e
       INNER JOIN favorites f ON e.id = f.entry_id
       WHERE f.user_id = ?
       ORDER BY e.word ASC`
    )
    .all(userId) as Entry[];
}

export { getDb };
