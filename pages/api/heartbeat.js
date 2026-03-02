// This endpoint is a lightweight health check and must remain free of
// database imports or any other heavy operations. It is intended to be
// called frequently by monitoring tools.
export default function handler(request, response) {
  response.status(200).json({ status: 'ok' });
}
