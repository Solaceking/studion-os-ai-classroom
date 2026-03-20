# Studion UI Integration Guide

This repository is best used as a dedicated generation engine behind the Studion OS UI.

## Architecture

- Studion OS UI: auth, profile, program/course hierarchy, Professor K chat UX
- Studion OS AI Classroom: generation jobs, scene creation, persisted classroom payloads

Studion calls this service through APIs and renders responses in your existing chat + canvas layout.

## Core API Flow

1. `POST /api/generate-classroom` with prompt + optional file context.
2. Poll `GET /api/generate-classroom/{jobId}` until `succeeded`.
3. Load payload using `GET /api/classroom?id={classroomId}`.
4. Map scenes into Studion's renderer/export pipeline.

## Why this works with your UI

- You can keep Studion as the only front-end users see.
- This repo becomes an internal orchestration/content engine.
- Route names can stay unchanged initially to reduce migration risk.

## Suggested next integration step

Create a small adapter in Studion:

- `createClassroomJob(input)` -> POST `/api/generate-classroom`
- `getClassroomJob(jobId)` -> GET `/api/generate-classroom/{jobId}`
- `getClassroom(classroomId)` -> GET `/api/classroom?id=...`

Then convert returned scenes to your `StudioArtifact` schema.
