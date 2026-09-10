import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, SupportedLanguage } from './translations';

export type { SupportedLanguage };

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, paramsOrFallback?: Record<string, string | number> | string, fallback?: string) => string;
}

const STORAGE_KEY = 'smart_farming_lang';

// Helper to normalize language code to 'en' | 'ta' | 'hi'
const normalizeLang = (lang: string | null | undefined): 'en' | 'ta' | 'hi' => {
  if (!lang) return 'en';
  const lower = lang.toLowerCase();
  if (lower.startsWith('ta')) return 'ta';
  if (lower.startsWith('hi')) return 'hi';
  return 'en';
};

// Helper to normalize to uppercase 'EN' | 'TA' | 'HI' for existing UI compatibility
const toUpperLang = (lang: string): SupportedLanguage => {
  const norm = normalizeLang(lang);
  return norm.toUpperCase() as SupportedLanguage;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key: string, paramsOrFallback?: Record<string, string | number> | string, fallback?: string) => {
    if (typeof paramsOrFallback === 'string') return paramsOrFallback;
    return fallback || key;
  },
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return toUpperLang(saved);
      }
    } catch (e) {
      // Ignore localStorage read errors
    }
    return 'EN';
  });

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    const upper = toUpperLang(newLang);
    setLanguageState(upper);
    try {
      localStorage.setItem(STORAGE_KEY, upper);
    } catch (e) {
      // Ignore localStorage write errors
    }
    // Update HTML document lang attribute for a11y & typography
    if (typeof document !== 'undefined') {
      document.documentElement.lang = normalizeLang(upper);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = normalizeLang(language);
    }
  }, [language]);

  const t = useCallback((
    key: string,
    paramsOrFallback?: Record<string, string | number> | string,
    fallbackParam?: string
  ): string => {
    if (!key) return '';
    const norm = normalizeLang(language);

    let params: Record<string, string | number> | undefined;
    let fallback = fallbackParam;
    if (typeof paramsOrFallback === 'string') {
      fallback = paramsOrFallback;
    } else if (typeof paramsOrFallback === 'object' && paramsOrFallback !== null) {
      params = paramsOrFallback;
    }

    const currentDict = translations[norm] || {};
    const enDict = translations.en || {};

    // 1. Exact match in current language
    let result = currentDict[key];

    // 2. If not found, try snake_case conversion (e.g., 'dashboard.farmHealth' -> 'dashboard_farm_health')
    if (result === undefined) {
      const snakeKey = key.replace(/\./g, '_');
      if (currentDict[snakeKey] !== undefined) {
        result = currentDict[snakeKey];
      }
    }

    // 3. Fallback to English dictionary
    if (result === undefined) {
      if (enDict[key] !== undefined) {
        result = enDict[key];
      } else {
        const snakeKey = key.replace(/\./g, '_');
        if (enDict[snakeKey] !== undefined) {
          result = enDict[snakeKey];
        }
      }
    }

    // 4. Dot notation suffix fallback (e.g. 'dashboard.farm_health_score' -> 'farm_health_score')
    if (result === undefined && key.includes('.')) {
      const parts = key.split('.');
      const lastPart = parts[parts.length - 1];
      if (currentDict[lastPart] !== undefined) {
        result = currentDict[lastPart];
      } else if (enDict[lastPart] !== undefined) {
        result = enDict[lastPart];
      }
    }

    if (result === undefined) {
      result = fallback !== undefined ? fallback : key;
    }

    // 5. Interpolation for {param} and {{param}}
    if (params && typeof result === 'string') {
      for (const [pKey, pVal] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{\\{?\\s*${pKey}\\s*\\}\\}?`, 'g'), String(pVal));
      }
    }

    return result;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export const useTranslation = () => useContext(LanguageContext);
