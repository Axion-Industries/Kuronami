// Client-side entry to initialize Vercel Speed Insights
try {
  // Use dynamic import to allow bundlers or native ESM in modern browsers
  import('@vercel/speed-insights')
    .then((mod) => {
      if (mod && typeof mod.injectSpeedInsights === 'function') {
        mod.injectSpeedInsights();
      }
    })
    .catch((err) => {
      // If importing as a package fails in the browser, log and silently continue
      // This can happen for pure npm environments without bundling.
      console.warn('Speed Insights module import failed:', err);
    });
} catch (e) {
  console.warn('Speed Insights initialization error:', e);
}
