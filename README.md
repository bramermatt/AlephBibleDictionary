# Aleph Bible Dictionary

Minimal, search-first Bible dictionary built with Next.js 14, App Router, TypeScript, Tailwind CSS, and SQLite.

## Features

- Clean homepage with centered search
- `/search?q=term` results from SQLite using `LIKE`
- Search form uses plain GET submit so it works reliably on mobile and without JavaScript
- Entry page at `/entry/[word]` with readable typography
- Bible reference detection (e.g. `John 3:16`) with verse preview panel
- Local personal notes (future premium feature)
- Basic email/password auth scaffolding + favorites/notes API endpoints
- Easton's import script for public-domain dictionary text
- Automatic fallback to mock JSON results if SQLite is unavailable in runtime

## Setup

```bash
npm install
npm run dev
```

## Database

Seed base entries:

```bash
npm run db:seed
```

Import Easton's-style text file:

```bash
npm run db:import:easton -- ./data/easton.txt
```

Expected input format: paragraph blocks where first line is the word and subsequent lines are the definition.
