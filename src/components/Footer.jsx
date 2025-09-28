import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: t('navigation.home') },
    { path: '/vehicles', label: t('navigation.vehicles') },
    { path: '/about', label: t('navigation.about') },
    { path: '/contact', label: t('navigation.contact') },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'LinkedIn', url: '#', icon: '💼' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{t('footer.company_name')}</h3>
          <p>{t('footer.description')}</p>
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="social-link"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('footer.quick_links')}</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t('footer.contact_info')}</h3>
          <div className="contact-info">
            <p>📍 {t('contact.address')}: İstanbul, Türkiye</p>
            <p>📞 {t('contact.phone_number')}: +90 212 123 45 67</p>
            <p>✉️ {t('contact.email_address')}: info@rentacar.com</p>
            <p>🕒 {t('contact.working_hours')}: 7/24 Hizmet</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('footer.follow_us')}</h3>
          <p>Bizi sosyal medyada takip edin ve güncel kampanyalardan haberdar olun.</p>
          <div className="newsletter">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="newsletter-input"
            />
            <button className="btn btn-primary newsletter-btn">
              Abone Ol
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} {t('footer.company_name')}. {t('footer.all_rights_reserved')}</p>
      </div>
    </footer>
  );
};

export default Footer;
