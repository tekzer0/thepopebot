// This endpoint is a lightweight health check and must remain free of
// database interactions or other heavy operations for monitoring purposes.
export default function handler(request, response) {
  response.status(200).json({ status: 'ok' });
}
