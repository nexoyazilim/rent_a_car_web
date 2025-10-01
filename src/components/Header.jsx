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
    <>
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-info">
                <a href="mailto:info@demo.com"><i className="fa-solid fa-envelope"></i> info@gmail.com</a>
                <a href="https://wa.me/+905353084466" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i> +90 535 308 44 66</a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="top-social-container d-flex justify-content-end align-items-center">
                <div className="social-links">
                  <a className="facebook-icon" href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                  <a className="insta-icon" href="https://www.instagram.com/ucarli.vip.travel?igsh=YWI1MjM1cDR2bDRp&amp;utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Header;
