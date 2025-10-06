import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'tr', // varsayılan dil
    fallbackLng: 'en',
    debug: false,
    
    backend: {
      loadPath: `${import.meta.env.BASE_URL}assets/i18n/{{lng}}.json`,
    },
    
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },
    
    react: {
      useSuspense: false,
    },
    supportedLngs: ['tr', 'en', 'ar'],
  });

export default i18n;
