import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguagePreference } from './languagePreference.js';

test('keeps an explicit language selection when one exists', () => {
  const resolved = resolveLanguagePreference({ currentLanguage: 'en', storage: { getItem: () => 'tr' } });
  assert.equal(resolved, 'en');
});

test('uses the saved preference when present', () => {
  const resolved = resolveLanguagePreference({ currentLanguage: null, storage: { getItem: () => 'tr' } });
  assert.equal(resolved, 'tr');
});

test('falls back to Turkish for Turkish browser hints', () => {
  const resolved = resolveLanguagePreference({
    currentLanguage: null,
    storage: { getItem: () => null },
    navigatorObj: { language: 'tr-TR' },
    intlObj: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: 'UTC' }) }) }
  });

  assert.equal(resolved, 'tr');
});

test('falls back to English otherwise', () => {
  const resolved = resolveLanguagePreference({
    currentLanguage: null,
    storage: { getItem: () => null },
    navigatorObj: { language: 'en-US' },
    intlObj: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: 'UTC' }) }) }
  });

  assert.equal(resolved, 'en');
});
