# Studion OS AI Classroom

Multi-agent classroom generation engine for Studion OS.

## What this repo is

Studion OS AI Classroom generates full interactive classroom sessions from a prompt and optional course files. It supports:

- Outline -> scene generation pipeline
- Multi-agent classroom playback
- Slide, quiz, interactive, and PBL scene types
- Export to PPTX / HTML resource pack

## Product direction

This fork is intentionally focused on the core classroom engine.
Community/OpenClaw integration content has been removed in this branch to keep the product lean.

## Quick start

### Prerequisites

- Node.js >= 20
- pnpm >= 10

### Install

```bash
pnpm install
```

### Configure

```bash
cp .env.example .env.local
```

Set at least one model provider key in `.env.local`.

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build && pnpm start
```

## Core APIs for Studion UI integration

- `POST /api/generate-classroom` -> create async generation job
- `GET /api/generate-classroom/{jobId}` -> poll generation progress/result
- `GET /api/classroom?id={classroomId}` -> fetch persisted classroom payload
- `GET /api/health` -> health/capability check

See `docs/STUDION-UI-INTEGRATION.md` for an implementation guide.

## License

AGPL-3.0 (inherits upstream license).

## Production Hosting

Use this service as a hosted engine behind Studion OS (not local-only).

- Production env template: .env.production.example
- Hosting/auth guide: docs/PRODUCTION-HOSTING.md
- Studion adapter guide: STUDION-UI-INTEGRATION.md


