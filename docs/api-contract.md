# API Contract — v1

> Owned by: Aditi
> Status: **Day 1 draft — Auth endpoints only.** Extend this file in Phase 2 (Matches) and Phase 3 (Requests). Never change a shape here without pinging both Frontend and Backend devs — this file is the single source of truth both teams build against.

Base URL (local dev): `http://localhost:5000/api`

All authenticated routes require:
```
Authorization: Bearer <token>
```

---

## POST `/auth/register`

Creates a new user account.

### Request Body
```json
{
  "name": "Aditi kr",
  "email": "aditi.kr@college.edu",
  "password": "SecurePass123"
}
```

| Field | Type | Rules |
|---|---|---|
| `name` | string | required, 2–50 chars |
| `email` | string | required, valid email format, unique |
| `password` | string | required, min 8 chars |

### Success Response — `201 Created`
```json
{
  "success": true,
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Aditi kr",
    "email": "aditi.kr@college.edu",
    "skillsToTeach": [],
    "skillsToLearn": [],
    "avatarUrl": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses
```json
// 400 — validation failed
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}
```
```json
// 409 — email already registered
{
  "success": false,
  "message": "An account with this email already exists"
}
```

---

## POST `/auth/login`

Authenticates an existing user.

### Request Body
```json
{
  "email": "aditi.kr@college.edu",
  "password": "SecurePass123"
}
```

### Success Response — `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Aditi kr",
    "email": "aditi.kr@college.edu",
    "skillsToTeach": ["Python", "Guitar"],
    "skillsToLearn": ["Spanish", "Chess"],
    "avatarUrl": "https://res.cloudinary.com/.../avatar.jpg"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses
```json
// 400 — missing fields
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Email is required" }
  ]
}
```
```json
// 401 — wrong credentials
{
  "success": false,
  "message": "Invalid email or password"
}
```

> **Security note:** always return the *same* generic "Invalid email or password" message whether the email doesn't exist or the password is wrong — never reveal which one failed, or you leak which emails are registered.

---

## GET `/health`

Basic uptime check — no auth required. Backend (Dev C/D) build this first, today.

### Success Response — `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2026-07-18T10:00:00.000Z"
}
```

---

## Notes for Frontend (Dev A & B)

- Store `token` from the response in `AuthContext` (and persist to `localStorage` for now — this is what Day 3's mock context should fake, and Day 4 will replace with the real call).
- The `user` object shape above is exactly what `ProfileSetupPage` and the dashboard will consume later — build your mock data to match these exact field names (`skillsToTeach`, `skillsToLearn`, `avatarUrl`) so Day 4 integration is a drop-in swap, not a rewrite.
- Every error response follows the same two shapes: an `errors` array (field-level validation) or a single `message` string (business logic errors like duplicate email or bad credentials). Design your form error-handling to branch on which shape it gets.

## Notes for Backend (Dev C & D)

- `express-validator` should produce the `errors` array shape above — map its output to `{ field, message }` pairs in a shared error-formatting middleware so every route returns errors consistently, not just Auth.
- Never return `passwordHash` in any response — the `user` object above is the exact allow-list of fields to send back, everything else on the Mongoose model stays server-side.
- `id` in responses should be the Mongo `_id` cast to a string, not the raw ObjectId.