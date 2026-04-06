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

export function useVisitorTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.__portfolioTrackingSent) {
      return;
    }
    window.__portfolioTrackingSent = true;

    try {
      const visitorId = readOrCreate(window.localStorage, VISITOR_KEY);
      const sessionId = readOrCreate(window.sessionStorage, SESSION_KEY);
      const apiOrigin = (import.meta.env.VITE_ANALYTICS_API_ORIGIN || '').replace(/\/$/, '');

      const payload = {
        eventType: 'pageview',
        path: window.location.pathname || '/',
        referrer: document.referrer || null,
        visitorId,
        sessionId,
        screenWidth: window.screen?.width || null,
        screenHeight: window.screen?.height || null,
        language: navigator.language || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null
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
    } catch {
      // Ignore storage/network issues for analytics.
    }
  }, []);
}
