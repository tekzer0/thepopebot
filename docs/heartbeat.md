# Heartbeat Endpoint

## Overview
The **GET `/api/heartbeat`** endpoint provides a lightweight health‑check that can be called
frequently by orchestration tools, load balancers, or monitoring services.  

- **Response:** `200 OK` with JSON `{ "status": "ok" }`
- **No database access:** The handler does not import any code that would initialize or query the database, ensuring minimal overhead.
- **Method restriction:** Only `GET` requests are allowed; other HTTP methods receive a `405 Method Not Allowed` response.

## Usage Example
