// Backend endpoint: GET /api/random -> { "number": 1..100 }
export default async () => {
  const number = Math.floor(Math.random() * 100) + 1;
  return Response.json({ number }, { headers: { 'Cache-Control': 'no-store' } });
};

export const config = { path: '/api/random' };
