// Client-side entry to initialize Vercel Speed Insights
try {
  // Use dynamic import to allow bundlers or native ESM in modern browsers
  import('@vercel/speed-insights')
    .then((mod) => {
      if (mod && typeof mod.injectSpeedInsights === 'function') {
        try {
          mod.injectSpeedInsights();
        } catch (err) {
          console.warn('injectSpeedInsights failed:', err);
        }
      }
    })
    .catch((err) => {
      // If importing as a package fails in the browser, log and silently continue
      // This can happen for pure npm environments without bundling.
      console.warn('Speed Insights module import failed:', err);
      // Fallback: try loading from Vercel CDN as a UMD script
      try {
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@vercel/speed-insights/dist/speed-insights.umd.js';
        s.async = true;
        s.onload = function () {
          try {
            if (window.SpeedInsights && typeof window.SpeedInsights.injectSpeedInsights === 'function') {
              window.SpeedInsights.injectSpeedInsights();
            }
          } catch (e) {
            console.warn('Speed Insights CDN fallback failed:', e);
          }
        };
        document.head.appendChild(s);
      } catch (e) {
        console.warn('Speed Insights CDN injection failed:', e);
      }
    });
} catch (e) {
  console.warn('Speed Insights initialization error:', e);
}
