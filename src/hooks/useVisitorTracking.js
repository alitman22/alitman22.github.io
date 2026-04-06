import { useEffect } from 'react';

const VISITOR_KEY = 'portfolio_visitor_id';
const SESSION_KEY = 'portfolio_session_id';

function randomId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }

  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function readOrCreate(storage, key) {
  const existing = storage.getItem(key);
  if (existing) return existing;

  const created = randomId();
  storage.setItem(key, created);
  return created;
}

function sanitizeReferrer(referrer) {
  if (!referrer) return null;
  try {
    const parsed = new URL(referrer);
    return `${parsed.origin}${parsed.pathname || '/'}`;
  } catch {
    return String(referrer).slice(0, 400);
  }
}

function currentPath() {
  return window.location.pathname || '/';
}

export function useVisitorTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const visitorId = readOrCreate(window.localStorage, VISITOR_KEY);
      const sessionId = readOrCreate(window.sessionStorage, SESSION_KEY);
      const apiOrigin = (import.meta.env.VITE_ANALYTICS_API_ORIGIN || '').replace(/\/$/, '');

      const basePayload = () => ({
        visitorId,
        sessionId,
        screenWidth: window.screen?.width || null,
        screenHeight: window.screen?.height || null,
        language: navigator.language || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null
      });

      const send = (eventType, path, referrer = null) => {
        const payload = {
          ...basePayload(),
          eventType,
          path,
          referrer: sanitizeReferrer(referrer)
        };

        fetch(`${apiOrigin}/api/track`, {
          method: 'POST',
          credentials: 'include',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {
          // Swallow tracking failures to keep UX unaffected.
        });
      };

      let lastTrackedPath = null;
      const trackPageview = (referrer = null) => {
        const path = currentPath();
        if (path === lastTrackedPath) return;
        lastTrackedPath = path;
        send('pageview', path, referrer);
      };

      trackPageview(document.referrer || null);

      const onPopState = () => trackPageview();
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          send('visibility_hidden', currentPath());
        }
      };
      const onPageHide = () => send('session_end', currentPath());

      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function patchedPushState(...args) {
        originalPushState.apply(this, args);
        trackPageview();
      };

      window.history.replaceState = function patchedReplaceState(...args) {
        originalReplaceState.apply(this, args);
        trackPageview();
      };

      window.addEventListener('popstate', onPopState);
      window.addEventListener('pagehide', onPageHide);
      document.addEventListener('visibilitychange', onVisibilityChange);

      return () => {
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
        window.removeEventListener('popstate', onPopState);
        window.removeEventListener('pagehide', onPageHide);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    } catch {
      // Ignore storage/network issues for analytics.
    }

    return undefined;
  }, []);
}
