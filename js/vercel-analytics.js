// Lightweight loader for Vercel Web Analytics
// This file imports `inject` from the official ESM CDN and calls it once loaded.
// Using the CDN avoids requiring a bundler for small static sites.

// Note: If you deploy to Vercel, you can keep the npm package and import from
// "@vercel/analytics" directly in your build system. For local static usage
// the unpkg ESM entrypoint works in modern browsers.

try {
  const { inject } = await import('https://cdn.jsdelivr.net/npm/@vercel/analytics@1.5.0/dist/index.mjs');
  if (typeof inject === 'function') {
    inject();
  } else {
    console.warn('Vercel Analytics: inject() not found on the imported module.');
  }
} catch (err) {
  console.warn('Vercel Analytics: failed to load analytics module.', err);
}
