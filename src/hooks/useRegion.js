import { useEffect, useState } from 'react';

function getBrowserRegionHint() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return null;
  }

  const language = (navigator.language || '').toLowerCase();
  const timezone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();

  if (language.startsWith('tr') || language.includes('tur')) {
    return 'TR';
  }

  if (timezone.includes('istanbul') || timezone === 'europe/istanbul' || timezone === 'asia/istanbul') {
    return 'TR';
  }

  return null;
}

async function fetchRegionFromApi() {
  const endpoints = ['https://ipapi.co/json/', 'https://api.country.is'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
      if (!response.ok) continue;

      const data = await response.json();
      const countryCode = String(data?.country || data?.country_code || '').toUpperCase();
      return countryCode === 'TR' ? 'TR' : 'GLOBAL';
    } catch {
      // Try the next endpoint if this one fails.
    }
  }

  return 'GLOBAL';
}

export function useRegion() {
  const [region, setRegion] = useState('GLOBAL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const detectRegion = async () => {
      try {
        const browserHint = getBrowserRegionHint();
        if (browserHint) {
          if (isActive) {
            setRegion(browserHint);
            setIsLoading(false);
          }
          return;
        }

        const detectedRegion = await fetchRegionFromApi();
        if (!isActive) return;
        setRegion(detectedRegion);
      } catch {
        if (isActive) setRegion('GLOBAL');
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    detectRegion();

    return () => {
      isActive = false;
    };
  }, []);

  return { region, isLoading };
}
