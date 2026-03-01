# wpscan-ui — Instructions

## Project

Dashboard for triggering WordPress security scans and viewing results. Connects to the wpscan-api backend.

## Stack

- Vite + React + TypeScript
- react-router-dom for routing

## Structure

- `src/pages/` — Page components (Dashboard, NewScan, ScanDetail)
- `src/api/` — API client functions
- `src/components/` — Reusable UI components

## Running

```bash
npm run dev
```

Dev server starts on port 5173.

## Configuration

- `VITE_API_URL` — Backend API base URL (defaults to `http://localhost:8080/api/v1`)
