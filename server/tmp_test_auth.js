(async () => {
  try {
    const t = Date.now();
    const email = `test+${t}@example.com`;
    const base = 'http://localhost:3001';

    const signupRes = await fetch(`${base}/api/auth/signup`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email, password: 'password123' })
    });
    const signupText = await signupRes.text();
    console.log('SIGNUP', signupRes.status, signupText);

    const cookie = signupRes.headers.get('set-cookie') || '';

    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify({ email, password: 'password123' })
    });
    const loginText = await loginRes.text();
    console.log('LOGIN', loginRes.status, loginText);

    const cookie2 = loginRes.headers.get('set-cookie') || cookie;

    const profileRes = await fetch(`${base}/api/auth/profile`, {
      method: 'GET',
      headers: { cookie: cookie2 }
    });
    const profileText = await profileRes.text();
    console.log('PROFILE', profileRes.status, profileText);
  } catch (e) {
    console.error('ERROR', e);
  }
})();
