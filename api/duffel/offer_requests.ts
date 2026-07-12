declare const process: { env: Record<string, string | undefined> }

export const config = { runtime: 'edge' }

const DUFFEL_API = 'https://api.duffel.com'

const ALLOWED = ['air/offer_requests']

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace(/^\/api\/duffel\//, '')

  if (!ALLOWED.some((p) => path.startsWith(p))) {
    return json({ errors: [{ message: 'Route not allowed' }] }, 403)
  }

  const token = process.env.DUFFEL_TOKEN
  if (!token) {
    return json({ errors: [{ message: 'Server misconfigured: missing DUFFEL_TOKEN' }] }, 500)
  }

  const upstream = await fetch(`${DUFFEL_API}/${path}${url.search}`, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Duffel-Version': 'v2',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: req.method === 'GET' ? undefined : await req.text(),
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
