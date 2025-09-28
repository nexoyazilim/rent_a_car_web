import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import '../styles/contact.css';

// SVG Icon Components
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

const Contact = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  useScrollReveal(); // Initialize scroll reveal animations

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });


  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mesajınız başarıyla gönderildi!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb Section */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 bg_img pos_relative" style={{backgroundImage: 'url(/assets/images/renault_clio.png)', backgroundPosition: 'bottom'}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs_content align_center_center">
                <h3 className="text-uppercase color_ff" style={{paddingBottom: '20px', color: '#fff', textTransform: 'uppercase', marginTop: '130px'}}>İletişim</h3>
                <ol className="breadcrumb">
                  <li><a href="/">Ana Sayfa</a></li>
                  <li className="active">İletişim</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      <div className="contact-container-wrapper">
        <div className="contact-container">
        <section className="contact-form-section">
          <h1>Bize Ulaşın</h1>
          <p>Kiralama işlemleri, rezervasyonlar veya diğer tüm sorularınız için formu doldurun.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-posta Adresi</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon Numarası (İsteğe Bağlı)</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Konu</label>
              <select 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-control" 
                required
              >
                <option value="">Lütfen bir konu seçin...</option>
                <option value="rezervasyon">Rezervasyon Bilgisi</option>
                <option value="destek">Destek Talebi</option>
                <option value="geri-bildirim">Geri Bildirim</option>
                <option value="diger">Diğer</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Mesajınız</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-control" 
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Mesajı Gönder</button>
          </form>
        </section>

        <section className="contact-info-section">
          <h2>İletişim Bilgileri</h2>
          <div className="info-item">
            <LocationIcon />
            <div className="info-item-content">
              <p>Adres</p>
              <p>Merkez Mahallesi, Araç Kiralama Caddesi No:123, Beşiktaş/İstanbul</p>
            </div>
          </div>
          <div className="info-item">
            <PhoneIcon />
            <div className="info-item-content">
              <p>Telefon</p>
              <p><a href="tel:+902121234567">+90 (212) 123 45 67</a></p>
            </div>
          </div>
          <div className="info-item">
            <EmailIcon />
            <div className="info-item-content">
              <p>E-posta</p>
              <p><a href="mailto:info@rentacar.com">info@rentacar.com</a></p>
            </div>
          </div>
          <div className="info-item">
            <ClockIcon />
            <div className="info-item-content">
              <p>Çalışma Saatleri</p>
              <p>Pazartesi - Cuma: 08:00 - 18:00<br/>Cumartesi: 09:00 - 16:00<br/>Pazar: Kapalı</p>
            </div>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9633698339347!2d29.0082!3d41.0431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5bd657bd40f%3A0x8c0b618a4c0b0b0b!2sBe%C5%9Fikta%C5%9F%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1640000000000!5m2!1str!2str"
              loading="lazy"
              title="Konum"
            ></iframe>
          </div>
        </section>
        </div>
      </div>
      
      {/* Fixed WhatsApp Button */}
      <div className="fixed-social">
        <a href="https://wa.me/+905555555555" target="_blank" className="whatsapp" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
          <i className="fa fa-whatsapp"></i>
        </a>
      </div>
      
      {/* Language Switcher */}
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
          </button>
          <button 
            className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            <span className="flag">🇺🇸</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
