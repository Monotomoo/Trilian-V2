// GitHub OAuth init for Decap CMS.
// Redirects the browser to github.com/login/oauth/authorize with our app's
// client_id; GitHub then redirects back to /api/oauth/callback with a code.
//
// Required env vars (set in Vercel project settings):
//   GITHUB_CLIENT_ID      — from https://github.com/settings/developers
//   GITHUB_CLIENT_SECRET  — same place
//
// This route uses the modern Web-standard Vercel function signature
// (Request → Response), no @vercel/node import needed.

export const config = { runtime: 'nodejs' }

export default async function handler(request: Request): Promise<Response> {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    return new Response('Missing GITHUB_CLIENT_ID env var', { status: 500 })
  }

  // Build the redirect URI back to our callback. Use the deployment's own
  // origin so this works for both prod (trilian-v2.vercel.app) and previews.
  const origin = new URL(request.url).origin
  const redirectUri = `${origin}/api/oauth/callback`

  // CSRF state token — Decap doesn't strictly require it, but cookies-based
  // verification stops a third party from completing the flow on Vedra's
  // behalf.
  const state = crypto.randomUUID()

  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', 'repo,user')
  authUrl.searchParams.set('state', state)

  const headers = new Headers({
    Location: authUrl.toString(),
  })
  headers.append(
    'Set-Cookie',
    `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`,
  )

  return new Response(null, { status: 302, headers })
}
