# Production Hosting + API Auth (Studion OS AI Classroom)

This service should be hosted remotely and consumed by Studion OS over HTTPS.

## 1) Hosting model

Use container hosting with persistent storage, because classroom/job payloads are written under `/app/data`.

Recommended options:
- VM + Docker Compose
- Managed container with persistent disk/volume

Avoid stateless serverless-only runtime for this codebase unless storage is refactored to DB/object storage.

## 2) Environment setup

Use `.env.production.example` as baseline and set secrets in your host:
- `ENGINE_API_KEY` (required for API protection)
- at least one model provider key (`OPENAI_API_KEY` etc.)
- `DEFAULT_MODEL` (optional but recommended)

## 3) API auth behavior

Auth is enforced by `middleware.ts` for all `/api/*` routes except `/api/health`.

Accepted auth methods:
- `Authorization: Bearer <ENGINE_API_KEY>`
- `x-engine-key: <ENGINE_API_KEY>`

If `ENGINE_API_KEY` is not set, auth is skipped (dev convenience only).

## 4) Docker Compose deployment

Example:

```bash
cp .env.production.example .env.production
# fill values

docker compose --env-file .env.production up -d --build
```

Service endpoint will be exposed on configured host/port.

## 5) Studion OS integration contract

From Studion OS backend/UI, call:
- `POST /api/generate-classroom`
- `GET /api/generate-classroom/{jobId}`
- `GET /api/classroom?id={classroomId}`
- `GET /api/health`

Always pass engine key header from Studion to engine service.

## 6) Reverse proxy (recommended)

Put Nginx/Caddy/Cloudflare in front of this service to provide:
- TLS termination
- request size limits for PDFs
- timeout tuning for generation routes
- IP allowlists/rate limits

## 7) Next hardening (recommended)

- Replace local `/app/data` with DB + object storage
- Rotate `ENGINE_API_KEY` via secret manager
- Add structured request logging + error tracking
- Add per-tenant auth (instead of single shared key)
