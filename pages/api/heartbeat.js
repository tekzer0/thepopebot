// This is a lightweight endpoint for health checks and must not
// import or call any code that triggers database initialization
// or heavy work.
export default function handler(request, response) {
  response.status(200).json({ status: 'ok' });
}
