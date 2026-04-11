import { useEffect } from 'react';

const VISITOR_KEY = 'portfolio_visitor_id';
const SESSION_KEY = 'portfolio_session_id';
const VIEWED_SECTIONS_KEY = 'portfolio_viewed_sections';

const EVENT_TYPE_PATTERN = /^[a-z0-9_:-]{2,40}$/i;

function normalizeEventType(value, fallback = 'pageview') {
  const normalized = String(value || '').trim().toLowerCase();
  if (EVENT_TYPE_PATTERN.test(normalized)) return normalized;
  return fallback;
}

function normalizeLabel(value, max = 160) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return normalized.slice(0, max);
}

function normalizeCategory(value) {
  const normalized = normalizeLabel(value, 40);
  if (!normalized) return null;
  return /^[a-z0-9_:-]+$/i.test(normalized) ? normalized.toLowerCase() : null;
}

function sanitizeTargetUrl(value) {
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw) return null;

  try {
    const parsed = new URL(raw, window.location.origin);
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return null;
    }

    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return `${parsed.origin}${parsed.pathname || '/'}`.slice(0, 400);
    }

    return parsed.toString().slice(0, 400);
  } catch {
    return null;
  }
}

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

function currentScrollDepth() {
  const viewport = window.innerHeight || document.documentElement.clientHeight || 0;
  const fullHeight = Math.max(
    document.body?.scrollHeight || 0,
    document.documentElement?.scrollHeight || 0
  );

  if (fullHeight <= viewport) return 100;
  const depth = ((window.scrollY + viewport) / fullHeight) * 100;
  return Math.max(0, Math.min(100, Math.round(depth)));
}

export function useVisitorTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const visitorId = readOrCreate(window.localStorage, VISITOR_KEY);
      const sessionId = readOrCreate(window.sessionStorage, SESSION_KEY);
      const apiOrigin = (import.meta.env.VITE_ANALYTICS_API_ORIGIN || '').replace(/\/$/, '');
      const endpoint = `${apiOrigin}/api/track`;

      const basePayload = () => ({
        visitorId,
        sessionId,
        screenWidth: window.screen?.width || null,
        screenHeight: window.screen?.height || null,
        language: navigator.language || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null
      });

      const send = (eventType, path, referrer = null, options = {}) => {
        const payload = {
          ...basePayload(),
          eventType: normalizeEventType(eventType),
          path,
          referrer: sanitizeReferrer(referrer),
          eventCategory: normalizeCategory(options.eventCategory),
          eventLabel: normalizeLabel(options.eventLabel),
          targetUrl: sanitizeTargetUrl(options.targetUrl),
          section: normalizeLabel(options.section, 80),
          scrollDepth: Number.isFinite(options.scrollDepth) ? Math.max(0, Math.min(100, Math.round(options.scrollDepth))) : null,
          metadata: options.metadata && typeof options.metadata === 'object' ? options.metadata : undefined
        };

        const body = JSON.stringify(payload);

        if (options.preferBeacon && typeof navigator.sendBeacon === 'function') {
          try {
            const blob = new Blob([body], { type: 'application/json' });
            if (navigator.sendBeacon(endpoint, blob)) {
              return;
            }
          } catch {
            // Fall back to fetch if beacon fails.
          }
        }

        fetch(endpoint, {
          method: 'POST',
          credentials: 'include',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body
        }).catch(() => {
          // Swallow tracking failures to keep UX unaffected.
        });
      };

      let lastTrackedPath = null;
      const trackPageview = (referrer = null) => {
        const path = currentPath();
        if (path === lastTrackedPath) return;
        lastTrackedPath = path;
        send('page_view', path, referrer, {
          eventCategory: 'navigation',
          scrollDepth: currentScrollDepth()
        });
      };

      trackPageview(document.referrer || null);

      const onPopState = () => trackPageview();
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          send('visibility_hidden', currentPath());
        }
      };
      const onPageHide = () => send('session_end', currentPath());

      const viewedSectionIds = new Set(
        String(window.sessionStorage.getItem(VIEWED_SECTIONS_KEY) || '')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      );

      const persistViewedSections = () => {
        if (viewedSectionIds.size === 0) return;
        window.sessionStorage.setItem(VIEWED_SECTIONS_KEY, Array.from(viewedSectionIds).join(','));
      };

      const sectionObserver =
        typeof IntersectionObserver !== 'undefined'
          ? new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (!entry.isIntersecting) return;

                  const sectionId = normalizeLabel(entry.target.id, 80);
                  if (!sectionId || viewedSectionIds.has(sectionId)) return;

                  viewedSectionIds.add(sectionId);
                  persistViewedSections();

                  send('section_view', currentPath(), null, {
                    eventCategory: 'engagement',
                    eventLabel: sectionId,
                    section: sectionId,
                    scrollDepth: currentScrollDepth()
                  });
                });
              },
              {
                threshold: 0.45,
                rootMargin: '0px 0px -15% 0px'
              }
            )
          : null;

      const observeSections = () => {
        if (!sectionObserver) return;

        document.querySelectorAll('section[id]').forEach((section) => {
          if (sectionObserver) {
            sectionObserver.observe(section);
          }
        });
      };

      observeSections();

      const mutationObserver =
        typeof MutationObserver !== 'undefined'
          ? new MutationObserver(() => observeSections())
          : null;

      if (mutationObserver) {
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      }

      const onDocumentClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const anchor = target.closest('a[href]');
        if (!(anchor instanceof HTMLAnchorElement)) return;

        const href = anchor.href;
        if (!href) return;

        const configuredEventType = normalizeEventType(anchor.dataset.analyticsEvent, '');

        const hrefLower = href.toLowerCase();
        const host = (() => {
          try {
            return new URL(href, window.location.origin).hostname.toLowerCase();
          } catch {
            return '';
          }
        })();

        let eventType = null;
        if (configuredEventType === 'project_link_click' || configuredEventType === 'project_click') {
          eventType = 'project_click';
        } else if (configuredEventType) {
          eventType = configuredEventType;
        } else if (anchor.hasAttribute('download') || hrefLower.includes('.pdf')) {
          eventType = 'resume_download';
        } else if (hrefLower.startsWith('mailto:') || hrefLower.startsWith('tel:')) {
          eventType = 'contact_click';
        } else if (host && host !== window.location.hostname) {
          eventType = 'outbound_click';
        }

        if (!eventType) return;

        const section = anchor.closest('section[id]')?.id || null;

        send(eventType, currentPath(), null, {
          eventCategory: anchor.dataset.analyticsCategory || (eventType === 'outbound_click' ? 'acquisition' : 'conversion'),
          eventLabel: anchor.dataset.analyticsLabel || anchor.textContent || null,
          targetUrl: href,
          section,
          scrollDepth: currentScrollDepth(),
          preferBeacon: true
        });
      };

      const emittedScrollDepths = new Set();
      const scrollMilestones = [10, 25, 50, 75, 90, 100];
      const onScroll = () => {
        const depth = currentScrollDepth();
        for (const milestone of scrollMilestones) {
          if (depth >= milestone && !emittedScrollDepths.has(milestone)) {
            emittedScrollDepths.add(milestone);
            send('scroll', currentPath(), null, {
              eventCategory: 'engagement',
              eventLabel: `${milestone}%`,
              scrollDepth: milestone,
              metadata: { milestone }
            });
          }
        }
      };

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
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('pagehide', onPageHide);
      document.addEventListener('visibilitychange', onVisibilityChange);
      document.addEventListener('click', onDocumentClick, true);

      onScroll();

      return () => {
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
        window.removeEventListener('popstate', onPopState);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('pagehide', onPageHide);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        document.removeEventListener('click', onDocumentClick, true);
        if (sectionObserver) {
          sectionObserver.disconnect();
        }
        if (mutationObserver) {
          mutationObserver.disconnect();
        }
      };
    } catch {
      // Ignore storage/network issues for analytics.
    }

    return undefined;
  }, []);
}
