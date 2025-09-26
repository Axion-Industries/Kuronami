Speed Insights integration

What I changed:
- Added `@vercel/speed-insights` to `package.json` dependencies.
- Updated `js/speed-insights-init.js` to attempt:
  1. Dynamic import of local package.
  2. CDN ESM import fallback (`https://cdn.jsdelivr.net/npm/@vercel/speed-insights/dist/index.mjs`).
  3. After 3s, direct script injection to `https://va.vercel-scripts.com/v1/speed-insights/script.js`.

How to test locally:
1. Install deps: `npm install`
2. Start server: `npm run serve` (serves at http://127.0.0.1:5000)
3. Open the site in a real browser and watch DevTools Console for logs starting with `[SpeedInsights]`.

Notes:
- Speed Insights requires page visits in a real browser to collect metrics. Curl or simple fetch won't execute the ESM module or external scripts.
- If you use ad-blockers / content blockers, Speed Insights requests may be blocked. Disable blockers during testing.
