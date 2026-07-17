import { useEffect, useMemo, useState } from 'react';
import { en } from '../content/en';
import { tr } from '../content/tr';
import { resolveLanguagePreference } from './languagePreference';

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  return resolveLanguagePreference({
    currentLanguage: null,
    storage: window.localStorage,
    navigatorObj: navigator,
    intlObj: Intl
  });
}

export function useLanguage() {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const initialLanguage = resolveLanguagePreference({
      currentLanguage: language,
      storage: window.localStorage,
      navigatorObj: navigator,
      intlObj: Intl
    });

    setLanguage((current) => (current === initialLanguage ? current : initialLanguage));
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const copy = useMemo(() => (language === 'tr' ? tr : en), [language]);

  return { language, setLanguage, copy };
}
