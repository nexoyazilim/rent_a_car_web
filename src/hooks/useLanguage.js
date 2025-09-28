import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'tr');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const getCurrentFlag = () => {
    return currentLanguage === 'tr' ? '🇹🇷' : '🇺🇸';
  };

  const getCurrentLanguageName = () => {
    return currentLanguage === 'tr' ? 'Türkçe' : 'English';
  };

  return {
    currentLanguage,
    changeLanguage,
    getCurrentFlag,
    getCurrentLanguageName
  };
};
