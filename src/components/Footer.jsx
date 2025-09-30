import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/footer.css';

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
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 4.99 3.64 9.13 8.4 9.94v-7.03H7.9v-2.9h2.38V9.41c0-2.35 1.4-3.65 3.55-3.65 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.45v1.74h2.58l-.41 2.9h-2.17V22c4.76-.81 8.4-4.95 8.4-9.94z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 5.92c-.75.33-1.55.55-2.39.66a4.16 4.16 0 0 0 1.83-2.3 8.28 8.28 0 0 1-2.63 1 4.14 4.14 0 0 0-7.06 3.78A11.75 11.75 0 0 1 3.15 4.6a4.12 4.12 0 0 0 1.28 5.52 4.09 4.09 0 0 1-1.87-.52v.05c0 2 1.42 3.68 3.3 4.06-.35.1-.72.15-1.1.15-.27 0-.53-.03-.78-.07.53 1.67 2.08 2.89 3.91 2.92A8.31 8.31 0 0 1 2 19.54a11.73 11.73 0 0 0 6.35 1.86c7.62 0 11.79-6.31 11.79-11.79l-.01-.54A8.27 8.27 0 0 0 22 5.92z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.25a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 18 6.25z"/>
        </svg>
      )
    }
  ];

  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Burada gerçek abonelik isteğini tetikleyebilirsiniz.
    // Şimdilik basit bir bildirim yeterli.
    alert(t('footer.subscription_success') || 'Aboneliğiniz alındı.');
    setEmail('');
  };

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
                target="_blank"
                rel="noopener noreferrer"
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
            <div className="social-icons" aria-label="Sosyal medya bağlantıları">
              {socialLinks.map((social) => (
                <a
                  key={`below-${social.name}`}
                  href={social.url}
                  className="social-link"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
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
