// Sign-in with Google / GitHub (OAuth) + signed session cookie.
//   GET /api/auth/login/:provider     -> redirect to provider
//   GET /api/auth/callback/:provider  -> exchange code, set session, go to /account.html
//   GET /api/auth/me                  -> { user } or 401
//   GET /api/auth/logout              -> clear session
// Env: SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

const SESSION_COOKIE = 'rg_session';
const STATE_COOKIE = 'rg_oauth_state';
const SESSION_DAYS = 7;

const PROVIDERS = {
  google: {
    authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile',
    id: () => process.env.GOOGLE_CLIENT_ID,
    secret: () => process.env.GOOGLE_CLIENT_SECRET,
    async profile(token) {
      const u = await getJson('https://openidconnect.googleapis.com/v1/userinfo', token);
      return { id: u.sub, name: u.name || u.email, email: u.email, avatar: u.picture };
    },
  },
  github: {
    authorizeUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scope: 'read:user user:email',
    id: () => process.env.GITHUB_CLIENT_ID,
    secret: () => process.env.GITHUB_CLIENT_SECRET,
    async profile(token) {
      const u = await getJson('https://api.github.com/user', token);
      let email = u.email;
      if (!email) {
        const emails = await getJson('https://api.github.com/user/emails', token).catch(() => []);
        email = (emails.find(e => e.primary && e.verified) || emails[0] || {}).email || null;
      }
      return { id: String(u.id), name: u.name || u.login, email, avatar: u.avatar_url };
    },
  },
};

export default async (req) => {
  const url = new URL(req.url);
  const [, , , action, providerName] = url.pathname.split('/'); // /api/auth/<action>/<provider>
  const provider = PROVIDERS[providerName];

  try {
    if (action === 'me') {
      const user = await readSession(req);
      return user ? Response.json({ user }, noStore()) : Response.json({ user: null }, { status: 401, ...noStore() });
    }

    if (action === 'logout') {
      return redirect('/', [cookie(SESSION_COOKIE, '', 0)]);
    }

    if (action === 'login' && provider) {
      if (!provider.id() || !provider.secret() || !process.env.SESSION_SECRET) {
        return errorPage(`הכניסה עם ${providerName} עוד לא הוגדרה.`);
      }
      const state = randomToken();
      const params = new URLSearchParams({
        client_id: provider.id(),
        redirect_uri: callbackUrl(url, providerName),
        response_type: 'code',
        scope: provider.scope,
        state,
      });
      if (providerName === 'google') params.set('prompt', 'select_account');
      return redirect(`${provider.authorizeUrl}?${params}`, [cookie(STATE_COOKIE, `${providerName}.${state}`, 600)]);
    }

    if (action === 'callback' && provider) {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      if (!code || !state || getCookie(req, STATE_COOKIE) !== `${providerName}.${state}`) {
        return errorPage('הכניסה בוטלה או שפג תוקפה. נסו שוב.');
      }
      const tokenRes = await fetch(provider.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: new URLSearchParams({
          client_id: provider.id(),
          client_secret: provider.secret(),
          code,
          redirect_uri: callbackUrl(url, providerName),
          grant_type: 'authorization_code',
        }),
      });
      const { access_token } = await tokenRes.json();
      if (!access_token) return errorPage('לא הצלחנו להשלים את הכניסה. נסו שוב.');

      const user = { ...(await provider.profile(access_token)), provider: providerName };
      const session = await sign({ user, exp: Date.now() + SESSION_DAYS * 864e5 });
      return redirect('/account.html', [
        cookie(SESSION_COOKIE, session, SESSION_DAYS * 86400),
        cookie(STATE_COOKIE, '', 0),
      ]);
    }

    return new Response('Not found', { status: 404 });
  } catch (err) {
    console.error(err);
    return errorPage('משהו השתבש בכניסה. נסו שוב בעוד רגע.');
  }
};

export const config = { path: '/api/auth/*' };

// ---------- helpers ----------

const callbackUrl = (url, provider) => `${url.origin}/api/auth/callback/${provider}`;
const noStore = () => ({ headers: { 'Cache-Control': 'no-store' } });

async function getJson(endpoint, token) {
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'User-Agent': 'rafiganan' },
  });
  if (!res.ok) throw new Error(`${endpoint} -> ${res.status}`);
  return res.json();
}

function redirect(location, cookies = []) {
  const headers = new Headers({ Location: location, 'Cache-Control': 'no-store' });
  cookies.forEach(c => headers.append('Set-Cookie', c));
  return new Response(null, { status: 302, headers });
}

function cookie(name, value, maxAge) {
  return `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function getCookie(req, name) {
  const match = (req.headers.get('cookie') || '').split(/;\s*/).find(c => c.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

function randomToken() {
  return b64url(crypto.getRandomValues(new Uint8Array(24)));
}

function b64url(bytes) {
  return Buffer.from(bytes).toString('base64url');
}

async function hmac(data) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(process.env.SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  return b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))));
}

async function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${await hmac(body)}`;
}

async function readSession(req) {
  const raw = getCookie(req, SESSION_COOKIE);
  if (!raw || !process.env.SESSION_SECRET) return null;
  const [body, sig] = raw.split('.');
  if (!body || !sig || sig !== (await hmac(body))) return null;
  const { user, exp } = JSON.parse(Buffer.from(body, 'base64url').toString());
  return exp > Date.now() ? user : null;
}

function errorPage(message) {
  const html = `<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>כניסה | רפי הגנן</title>
<body style="font-family:system-ui,sans-serif;background:#f7f3ea;color:#12301f;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center">
<div><div style="font-size:3rem">🌿</div><h1 style="font-size:1.4rem">${message}</h1>
<p><a href="/account.html" style="color:#24583d;font-weight:700">חזרה לאזור האישי</a></p></div></body></html>`;
  return new Response(html, { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}
