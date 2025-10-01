import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    (typeof window !== 'undefined' && window.localStorage.getItem('app_lang')) || i18n.language || 'tr'
  );

  // İlk yüklemede: URL'ye göre dili tespit et (TR slugs/EN slugs)
  useEffect(() => {
    const detectFromPath = () => {
      if (typeof window === 'undefined') return null;
      const first = `/${(window.location.pathname.split('/')[1] || '').toLowerCase()}`;
      const trSlugs = new Set(['/araclar', '/arac', '/hakkimizda', '/iletisim', '/rezervasyon']);
      const enSlugs = new Set(['/vehicles', '/vehicle', '/about', '/contact', '/booking']);
      if (trSlugs.has(first)) return 'tr';
      if (enSlugs.has(first)) return 'en';
      return null;
    };
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('app_lang') : null;
    const inferred = detectFromPath();
    const target = saved || inferred || i18n.language || 'tr';
    if (i18n.language !== target) {
      i18n.changeLanguage(target);
    }
    setCurrentLanguage(target);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', target === 'ar' ? 'rtl' : 'ltr');
    }
  }, []);

  // Yol çevirileri (EN <-> TR) – dil değişiminde URL'i eşleştir
  const translatePath = (pathname, lng) => {
    const enToTr = {
      '/vehicles': '/araclar',
      '/vehicle': '/arac',
      '/about': '/hakkimizda',
      '/contact': '/iletisim',
      '/booking': '/rezervasyon'
    };
    const trToEn = Object.fromEntries(Object.entries(enToTr).map(([en, tr]) => [tr, en]));

    // id gibi alt kısımlar için sadece ilk segmenti dönüştür
    const segments = pathname.split('/');
    const first = `/${segments[1] || ''}`;
    let mappedFirst = first;
    if (lng === 'tr') mappedFirst = enToTr[first] || first;
    else mappedFirst = trToEn[first] || first; // en ve ar için EN slug kullan
    segments[1] = mappedFirst.startsWith('/') ? mappedFirst.slice(1) : mappedFirst;
    return segments.join('/') || '/';
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('app_lang', lng);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
    }
    // URL'i güncelle
    if (typeof window !== 'undefined') {
      const { pathname, search, hash } = window.location;
      const newPath = translatePath(pathname, lng);
      if (newPath !== pathname) {
        window.history.replaceState({}, '', `${newPath}${search}${hash}`);
      }
    }
  };

  const getCurrentFlag = () => {
    if (currentLanguage === 'tr') return '🇹🇷';
    if (currentLanguage === 'ar') return '🇸🇦';
    return '🇺🇸';
  };

  const getCurrentLanguageName = () => {
    if (currentLanguage === 'tr') return 'Türkçe';
    if (currentLanguage === 'ar') return 'العربية';
    return 'English';
  };

  return {
    currentLanguage,
    changeLanguage,
    getCurrentFlag,
    getCurrentLanguageName
  };
};
