# ClearBank Nexus – Backend API Specification (Express + MongoDB)

A clean, secure API spec to power your banking management system. Designed for Express + MongoDB with JWT auth and role-based access (customer, admin).

Base URL: /api/v1
Auth: Bearer <JWT>
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

## Authentication & User Module

POST /auth/signup
- Body: { email, password, fullName }
- Response: { user: { id, email, role }, token }
- 409 if email exists

POST /auth/login
- Body: { email, password }
- Response: { user: { id, email, role }, token }
- 401 invalid creds

POST /auth/logout
- Header: Authorization
- Response: 204 No Content (invalidate refresh token if you use refresh tokens)

POST /auth/forgot-password
- Body: { email }
- Response: 202 Accepted

POST /auth/reset-password
- Body: { token, newPassword }
- Response: 204 No Content

POST /auth/change-password
- Header: Authorization
- Body: { currentPassword, newPassword }
- Response: 204 No Content

GET /me
- Header: Authorization
- Response: { id, email, role, fullName, status, createdAt }

---

## Customer Banking Module

GET /accounts/me
- Returns all accounts of the authenticated customer
- Response: [{ id, accountNumber, type, currency, balance, status, createdAt }]

GET /accounts/me/balance
- Optional filters: ?accountId=...
- Response: { totalBalance, currencyBreakdown: { INR: 12345, USD: 100 } }

POST /transactions/deposit
- Headers: Authorization, Idempotency-Key (recommended)
- Body: { accountId, amount, note? }
- Behaviour: atomic update balance + create transaction
- Response: { transactionId, accountId, amount, balanceAfter }

POST /transactions/withdraw
- Headers: Authorization, Idempotency-Key (recommended)
- Body: { accountId, amount, note? }
- Validations: account open, sufficient funds
- Response: { transactionId, accountId, amount, balanceAfter }
- 422 INSUFFICIENT_FUNDS if balance < amount

GET /transactions/me
- Query: ?accountId=&type=deposit|withdraw&from=ISO&to=ISO&limit=20&skip=0&sort=-createdAt
- Response: { items: [...], total, limit, skip }

---

## Admin Panel Module (RBAC: admin)

GET /admin/transactions
- Query: ?customerId=&accountId=&type=&status=&from=&to=&limit=50&skip=0&sort=-createdAt
- Response: { items: [...], total, limit, skip }

GET /admin/transactions/:id
- Response: { id, accountId, userId, type, amount, status, balanceBefore, balanceAfter, createdAt, meta }

GET /admin/accounts
- Query: ?status=open|closed&userId=&q=accountNumber|email&limit=&skip=&sort=
- Response: { items: [...], total, limit, skip }

GET /admin/accounts/:id
- Response: { id, userId, accountNumber, type, currency, balance, status, createdAt, updatedAt }

POST /admin/accounts
- Body: { userId, type, currency }
- Creates account with balance 0 and generated accountNumber
- Response: { id, accountNumber }

PATCH /admin/accounts/:id
- Body: { type?, status? } (do not patch balance here)
- Response: { id, ...updatedFields }

DELETE /admin/accounts/:id
- Behaviour: mark as closed (soft delete) and prevent future transactions
- Response: 204 No Content

---

## Request/Response Examples

Signup
POST /api/v1/auth/signup
{
  "email": "user@example.com",
  "password": "S3cureP@ss",
  "fullName": "Aditi Rao"
}

200 OK
{
  "user": { "id": "u_123", "email": "user@example.com", "role": "customer" },
  "token": "<jwt>"
}

Withdraw (Idempotent)
POST /api/v1/transactions/withdraw
Headers: Authorization: Bearer <jwt>, Idempotency-Key: 6f1b-...
{
  "accountId": "acc_123",
  "amount": 500.0
}

200 OK
{
  "transactionId": "tx_789",
  "accountId": "acc_123",
  "amount": 500,
  "balanceAfter": 4500
}

Error format
{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Balance is lower than requested amount",
    "details": { "balance": 300, "attempt": 500 }
  }
}

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

## Minimal Controller Checklist

- auth.controller: signup, login, logout, forgot, reset, changePassword, me
- accounts.controller: listMine, balanceMine, adminList, adminGet, adminCreate, adminPatch, adminClose
- transactions.controller: deposit, withdraw, listMine, adminList, adminGet
- middlewares: auth(roles?), validate(schema), rateLimit(tier), errorHandler, idempotency
- services: users, accounts, transactions (each using sessions for money ops)

---

## Environment (Backend)

- JWT_SECRET, JWT_EXPIRES_IN
- MONGO_URI, MONGO_DB
- RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX
- EMAIL_SMTP_* (for password reset emails) or any transactional email provider

---

## Status Codes

- 200 OK, 201 Created, 202 Accepted, 204 No Content
- 400 ValidationError, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 409 Conflict, 422 Unprocessable (e.g., INSUFFICIENT_FUNDS), 429 Too Many Requests
- 500 Internal Server Error

---

## Brand Note

Project uses the intuitive brand name “ClearBank Nexus” to communicate clarity and trust.

---

## Frontend Integration Notes

- Send Authorization: Bearer <token> on all protected routes
- Show toasts on 4xx messages; retry-safe operations with Idempotency-Key
- Use optimistic UI only for non-monetary actions; for money ops, wait for server confirmation
