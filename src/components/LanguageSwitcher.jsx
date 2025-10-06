import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  return (
    <div className="language-switcher">
      <button className="language-button" aria-label="Dil değiştir">
        <span className="flag">{getCurrentFlag()}</span>
      </button>
      <div className="language-dropdown">
        <button
          className={`language-option ${currentLanguage === 'tr' ? 'active' : ''}`}
          onClick={() => changeLanguage('tr')}
        >
          <span className="flag">🇹🇷</span>
          <span className="language-name">Türkçe</span>
        </button>
        <button
          className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          <span className="flag">🇺🇸</span>
          <span className="language-name">English</span>
        </button>
        <button
          className={`language-option ${currentLanguage === 'ar' ? 'active' : ''}`}
          onClick={() => changeLanguage('ar')}
        >
          <span className="flag">🇸🇦</span>
          <span className="language-name">العربية</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;


