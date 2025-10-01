import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const isTR = currentLanguage === 'tr';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('navigation.home') },
    { path: isTR ? '/araclar' : '/vehicles', label: t('navigation.vehicles') },
    { path: isTR ? '/hakkimizda' : '/about', label: t('navigation.about') },
    { path: isTR ? '/iletisim' : '/contact', label: t('navigation.contact') },
    { path: isTR ? '/kiralama-kosullari' : '/rental-terms', label: t('navigation.rental_terms') },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo" aria-label="Rent A Car Anasayfa">
          <img src="/assets/images/logo.png" alt="Rent A Car" className="site-logo" loading="eager" decoding="async" />
        </Link>

        <nav className="nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href="https://wa.me/+905555555555" target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label="WhatsApp ile yazın">
            {t('navigation.book_now')}
          </a>
          
          {/* Mobile menu button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/+905555555555"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mobile-book-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navigation.book_now')}
            </a>
          </nav>
        </div>
    </header>
  );
};

export default Header;
