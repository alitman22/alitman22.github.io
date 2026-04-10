import { useEffect, useMemo, useState } from 'react';
import { en } from '../content/en';
import { tr } from '../content/tr';

export function useLanguage() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    setLanguage(saved === 'tr' ? 'tr' : 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const copy = useMemo(() => (language === 'tr' ? tr : en), [language]);

  return { language, setLanguage, copy };
}
