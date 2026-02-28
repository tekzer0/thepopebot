/**
 * Heartbeat endpoint for health checks
 * 
 * This endpoint must remain lightweight and DB-free for monitoring purposes.
 * It should return HTTP 200 with a simple status indicator without touching
 * the database or performing any heavy operations.
 */
export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Return lightweight health status without any DB access
  response.status(200).json({ status: 'ok' });
}
