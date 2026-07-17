function isSupportedLanguage(value) {
  return value === 'en' || value === 'tr';
}

export function resolveLanguagePreference({ currentLanguage, storage, navigatorObj = globalThis.navigator, intlObj = globalThis.Intl } = {}) {
  if (isSupportedLanguage(currentLanguage)) {
    return currentLanguage;
  }

  const saved = storage?.getItem?.('preferredLanguage');
  if (saved === 'tr' || saved === 'en') {
    return saved;
  }

  const browserLanguage = (navigatorObj?.language || '').toLowerCase();
  const timezone = (intlObj?.DateTimeFormat?.().resolvedOptions?.().timeZone || '').toLowerCase();

  if (browserLanguage.startsWith('tr') || browserLanguage.includes('tur')) {
    return 'tr';
  }

  if (timezone.includes('istanbul') || timezone === 'europe/istanbul' || timezone === 'asia/istanbul') {
    return 'tr';
  }

  return 'en';
}
