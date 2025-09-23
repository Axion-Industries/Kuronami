// Client-side entry to initialize Vercel Speed Insights
try {
  // Use dynamic import to allow bundlers or native ESM in modern browsers
  console.info('[SpeedInsights] attempting dynamic import');
  import('@vercel/speed-insights')
    .then((mod) => {
      if (mod && typeof mod.injectSpeedInsights === 'function') {
        try {
          console.info('[SpeedInsights] calling injectSpeedInsights (local package)');
          mod.injectSpeedInsights();
        } catch (err) {
          console.warn('[SpeedInsights] injectSpeedInsights failed:', err);
        }
      } else {
        console.warn('[SpeedInsights] module loaded but injectSpeedInsights not found');
      }
    })
    .catch((err) => {
      // If importing as a package fails in the browser, log and silently continue
      // This can happen for pure npm environments without bundling.
  console.warn('[SpeedInsights] module import failed:', err);
      // Fallback: create a small inline module that imports the ESM build from CDN
      // and calls injectSpeedInsights(). This works in browsers without bundling
      // and does not rely on serving node_modules from the host.
      try {
        console.info('[SpeedInsights] attempting CDN ESM import fallback');
        var m = document.createElement('script');
        m.type = 'module';
        m.async = true;
        m.text = "import('https://cdn.jsdelivr.net/npm/@vercel/speed-insights/dist/index.mjs')"
          + ".then(mod => { if (mod && typeof mod.injectSpeedInsights === 'function') { try { console.info('[SpeedInsights] calling injectSpeedInsights (CDN ESM)'); mod.injectSpeedInsights(); } catch(e){ console.warn('[SpeedInsights] injectSpeedInsights (CDN) failed:', e); } } else { console.warn('[SpeedInsights] CDN module loaded but injectSpeedInsights not found'); } })"
          + ".catch(e => console.warn('[SpeedInsights] CDN ESM import failed:', e));";
        document.head.appendChild(m);
        // Also add a retry: if no window.si queue is present after 3s, try direct script injection
        setTimeout(function () {
          if (!window.si && !document.querySelector('script[src*="speed-insights/script.js"]')) {
            try {
              console.info('[SpeedInsights] falling back to direct script injection');
              var s = document.createElement('script');
              s.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
              s.defer = true;
              s.onload = function () { console.info('[SpeedInsights] direct script loaded'); };
              s.onerror = function () { console.warn('[SpeedInsights] direct script failed to load'); };
              document.head.appendChild(s);
            } catch (e) {
              console.warn('[SpeedInsights] direct script injection failed:', e);
            }
          }
        }, 3e3);
      } catch (e) {
        console.warn('[SpeedInsights] CDN ESM injection failed:', e);
      }
    });
} catch (e) {
  console.warn('Speed Insights initialization error:', e);
}
