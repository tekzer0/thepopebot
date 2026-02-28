/**
 * Heartbeat endpoint for health checks
 * This endpoint must remain lightweight and DB-free for monitoring purposes
 * It should return immediately without triggering any heavy work or DB access
 */

export default function handler(req, res) {
  // Return HTTP 200 with minimal JSON payload
  // No database access, no heavy computations
  res.status(200).json({ status: 'ok' });
}
