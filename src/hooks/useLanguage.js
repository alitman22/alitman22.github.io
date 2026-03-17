import { useEffect, useMemo, useState } from 'react';
import { en } from '../content/en';
import { tr } from '../content/tr';

export function useLanguage(isTurkeyRegion) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (!isTurkeyRegion) {
      setLanguage('en');
      localStorage.setItem('preferredLanguage', 'en');
      return;
    }

    const saved = localStorage.getItem('preferredLanguage');
    setLanguage(saved === 'tr' ? 'tr' : 'en');
  }, [isTurkeyRegion]);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const copy = useMemo(() => (language === 'tr' ? tr : en), [language]);

  return { language, setLanguage, copy };
}
