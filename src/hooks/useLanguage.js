import { useEffect, useMemo, useState } from 'react';
import { en } from '../content/en';
import { tr } from '../content/tr';

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const saved = window.localStorage.getItem('preferredLanguage');
  if (saved === 'tr' || saved === 'en') {
    return saved;
  }

  const browserLanguage = (navigator.language || '').toLowerCase();
  const timezone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();

  if (browserLanguage.startsWith('tr') || browserLanguage.includes('tur')) {
    return 'tr';
  }

  if (timezone.includes('istanbul') || timezone === 'europe/istanbul' || timezone === 'asia/istanbul') {
    return 'tr';
  }

  return 'en';
}

export function useLanguage() {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    const saved = window.localStorage.getItem('preferredLanguage');
    const initialLanguage = saved === 'tr' || saved === 'en' ? saved : getInitialLanguage();
    setLanguage(initialLanguage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const copy = useMemo(() => (language === 'tr' ? tr : en), [language]);

  return { language, setLanguage, copy };
}
