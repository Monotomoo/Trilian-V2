// GitHub OAuth callback for Decap CMS.
// Exchanges the `code` returned by GitHub for an access token, then sends
// the token back to the Decap window via postMessage.

export const config = { runtime: 'nodejs' }

type GitHubTokenResponse = {
  access_token?: string
  scope?: string
  token_type?: string
  error?: string
  error_description?: string
}

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const returnedState = url.searchParams.get('state')

  // Verify CSRF state
  const cookies = parseCookies(request.headers.get('cookie') ?? '')
  const cookieState = cookies['oauth_state']
  if (!cookieState || cookieState !== returnedState) {
    return errorPage('Invalid state — refusing to complete auth.')
  }

  if (!code) {
    return errorPage('Missing code parameter.')
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return errorPage('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET on server.')
  }

  // Exchange code for token
  let token: string | null = null
  let oauthError: string | null = null
  try {
    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })
    const data = (await resp.json()) as GitHubTokenResponse
    if (data.access_token) {
      token = data.access_token
    } else {
      oauthError = data.error_description || data.error || 'Unknown error'
    }
  } catch (e) {
    oauthError = e instanceof Error ? e.message : 'Token exchange failed'
  }

  // Build the Decap-shaped postMessage payload
  const status = token ? 'success' : 'error'
  const result = token
    ? { token, provider: 'github' }
    : { error: { message: oauthError ?? 'Unknown error' } }

  // Decap listens for messages of the form:
  //   "authorization:<provider>:<status>:<JSON-encoded payload>"
  const message = `authorization:github:${status}:${JSON.stringify(result)}`

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorising…</title>
  </head>
  <body>
    <p>Authorising…</p>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        var sent = false;
        function send() {
          if (sent || !window.opener) return;
          window.opener.postMessage(message, '*');
          sent = true;
          setTimeout(function () { window.close(); }, 50);
        }
        // Decap sends an "authorizing:<provider>" handshake; respond on receipt.
        window.addEventListener('message', function (e) {
          if (typeof e.data === 'string' && e.data.indexOf('authorizing:github') === 0) send();
        }, false);
        // Also send right away in case the handshake already fired.
        send();
      })();
    </script>
  </body>
</html>`

  const headers = new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  // Burn the CSRF cookie now that we used it.
  headers.append('Set-Cookie', 'oauth_state=; Path=/; Max-Age=0; SameSite=Lax')

  return new Response(html, { status: 200, headers })
}

function parseCookies(header: string): Record<string, string> {
  const out: Record<string, string> = {}
  if (!header) return out
  for (const pair of header.split(';')) {
    const [k, ...rest] = pair.trim().split('=')
    if (!k) continue
    out[k] = decodeURIComponent(rest.join('='))
  }
  return out
}

function errorPage(message: string): Response {
  return new Response(
    `<!doctype html><html><body style="font-family:system-ui;padding:2rem"><h1>Auth error</h1><p>${escapeHtml(
      message,
    )}</p></body></html>`,
    {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    },
  )
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
