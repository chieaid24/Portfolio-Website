export const revalidate = 604800;
const WEEK = 604800;
const BASE = 'https://proxy.royaleapi.dev/v1';
const TOKEN = process.env.CLASH_ROYALE_TOKEN;
const TAG   = process.env.CLASH_ROYALE_TAG || '#9UJLLC08R';

const enc = (t) => `%23${String(t).replace(/^#/, '').toUpperCase()}`;

export async function GET() {
  const res = await fetch(`${BASE}/players/${enc(TAG)}/battlelog`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: WEEK },
  });
  if (!res.ok) return new Response('Upstream error', { status: 502 });
  return new Response(await res.text(), {
    headers: {
      'content-type': 'application/json',
      'Cache-Control': 's-maxage=604800, stale-while-revalidate=604800',
    },
  });
}
