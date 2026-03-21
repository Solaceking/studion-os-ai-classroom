# Studion UI Integration Guide

This repository can run as a dedicated classroom-generation engine behind the Studion OS UI.

## Recommended architecture

- Studion OS (primary UX): auth, profile, program/course navigation, Professor K chat
- Studion OS AI Classroom (engine): generation jobs, scene payloads, classroom playback data

Studion calls this engine over HTTP and renders responses in your existing two-column UI.

## Minimal integration flow

1. User submits prompt + selected course files in Studion.
2. Studion calls `POST /api/generate-classroom`.
3. Studion polls `GET /api/generate-classroom/{jobId}`.
4. On success, Studion loads classroom data from `GET /api/classroom?id={classroomId}`.
5. Studion maps returned scenes into your canvas renderer/export pipeline.

## API contract snapshot

### Create job

`POST /api/generate-classroom`

Body (example):

```json
{
  "requirement": "Teach organizational change for MBA students",
  "language": "en-US",
  "pdfContent": { "text": "...optional context text...", "images": [] },
  "enableWebSearch": false
}
```

Response (example):

```json
{
  "jobId": "abc123",
  "status": "queued"
}
```

### Poll job

`GET /api/generate-classroom/{jobId}`

Response status values: `queued | running | succeeded | failed`.

### Fetch classroom

`GET /api/classroom?id={classroomId}`

Returns persisted classroom stage/scenes payload used for playback and export.

## Suggested deadweight policy

Keep only what serves the Studion experience:

- Keep: generation pipeline, classroom storage, scene rendering, export
- Disable/hide: community integrations, platform-specific assistant skills, optional UI controls not used in Studion

## Theming and branding

- Replace visible product copy with `Studion OS AI Classroom`
- Keep technical route names stable initially (`/api/generate-classroom`) to avoid migration risk
- Add API versioning only after first successful production usage
