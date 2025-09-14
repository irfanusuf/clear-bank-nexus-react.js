# ClearBank Nexus – Backend API Specification (Express + MongoDB)

A clean, secure API spec to power your banking management system. Designed for Express + MongoDB with JWT auth and role-based access (customer, admin).


Content-Type: application/json

---

## Data Model (MongoDB Collections)

- users
  - _id, email (unique), passwordHash, role: 'customer' | 'admin', status: 'active'|'blocked', fullName, lastLoginAt, createdAt, updatedAt
- accounts
  - _id, userId (ref users._id), accountNumber (unique), type: 'savings'|'current', currency (e.g., 'INR'|'USD'), balance (Number), status: 'open'|'closed', createdAt, updatedAt, closedAt
- transactions
  - _id, accountId (ref accounts._id), userId, type: 'deposit'|'withdraw', amount, balanceBefore, balanceAfter, status: 'success'|'failed', reason, idempotencyKey (unique optional), meta, createdAt
- password_resets (optional if using JWT-only flow)
  - _id, userId, token (hashed), expiresAt, usedAt, createdAt

Notes
- Always perform balance updates and transaction insert in a MongoDB session/transaction for atomicity.
- Enforce idempotency for deposit/withdraw using Idempotency-Key header stored in transactions.idempotencyKey.

---



## Validation & Security

- Passwords: bcrypt with strong salt rounds
- JWT: short-lived access token, optional refresh token; store only httpOnly cookies or Authorization header
- Input validation: celebrate/Joi or zod schemas per route
- Rate limiting: express-rate-limit (stricter on auth and money-moving routes)
- Headers: helmet, CORS locked to frontend origin
- Logging/audit: winston/pino; audit admin updates/deletes
- CSRF: not required for pure API with Authorization header; required if using cookies
- Idempotency: require Idempotency-Key for deposit/withdraw
- Atomicity: MongoDB transactions (session.startTransaction) to update balance and insert transaction together

---

## Query Conventions

- Pagination: limit (max 100), skip; return total
- Sorting: sort=field or sort=-field (default -createdAt)
- Date filters: ISO strings (from, to)

---


