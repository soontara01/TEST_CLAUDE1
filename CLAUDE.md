# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start       # production: node index.js
npm run dev     # development: nodemon index.js (auto-reloads on file changes)
```

Server runs on `http://localhost:3000` by default; override with the `PORT` environment variable.

## Architecture

Single-file Express app (`index.js`). All routes, middleware, and in-memory data live there.

**Endpoints:**
- `GET /api/items` — returns all items
- `GET /api/items/:id` — returns one item by numeric ID, 404 if missing
- `GET /health` — health check

**Data layer:** Items are stored as a hardcoded in-memory array (no database). All responses use `{ success: boolean, data | message }` envelope shape.
