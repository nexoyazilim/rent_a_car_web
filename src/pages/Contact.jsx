import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

const Contact = () => {
  const { t } = useTranslation();
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

  // Contact info data
  const contactInfo = [
    {
      icon: '📍',
      title: 'Adres',
      details: ['Merkez Mahallesi', 'Araç Kiralama Caddesi No:123', 'Beşiktaş/İstanbul']
    },
    {
      icon: '📞',
      title: 'Telefon',
      details: ['+90 212 123 45 67', '+90 532 123 45 67']
    },
    {
      icon: '✉️',
      title: 'E-posta',
      details: ['info@rentacar.com', 'destek@rentacar.com']
    },
    {
      icon: '🕒',
      title: 'Çalışma Saatleri',
      details: ['Pazartesi - Cuma: 08:00 - 18:00', 'Cumartesi: 09:00 - 16:00', 'Pazar: Kapalı']
    }
  ];

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
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>{t('contact.title')}</h1>
              <p>Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız</p>
            </div>
            <div className="hero-image">
              <img
                src="/assets/images/car.png"
                alt="İletişim - Araç Kiralama"
                className="wow fadeInUp animated"
                data-wow-delay="0.3s"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '400px',
                  display: 'block',
                  margin: '0 auto',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-top">
        <div className="container">
          <div className="contact-info-section wow fadeInUp animated" data-wow-delay="0.3s">
            <h2>İletişim Bilgileri</h2>
            
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="contact-info-icon">{info.icon}</div>
                  <div className="contact-info-content">
                    <h3>{info.title}</h3>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex}>{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Map */}
            <div className="map-container wow fadeInLeft animated" data-wow-delay="0.3s">
              <h3>Konumumuz</h3>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9633698339347!2d29.0082!3d41.0431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5bd657bd40f%3A0x8c0b618a4c0b0b0b!2sBe%C5%9Fikta%C5%9F%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1640000000000!5m2!1str!2str"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rent A Car Konumu - Beşiktaş, İstanbul"
                ></iframe>
                <div className="map-info">
                  <div className="map-details">
                    <span className="map-icon">📍</span>
                    <div className="map-text">
                      <p><strong>Adres:</strong> Merkez Mahallesi, Araç Kiralama Caddesi No:123</p>
                      <p><strong>Bölge:</strong> Beşiktaş, İstanbul</p>
                      <p><strong>Posta Kodu:</strong> 34353</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com/maps?q=Be%C5%9Fikta%C5%9F,+%C4%B0stanbul" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Google Maps'te Aç
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section wow fadeInRight animated" data-wow-delay="0.5s">
              <h2>Bize Mesaj Gönderin</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Konu</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Konu Seçin</option>
                      <option value="general">Genel Bilgi</option>
                      <option value="booking">Rezervasyon</option>
                      <option value="complaint">Şikayet</option>
                      <option value="suggestion">Öneri</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="6"
                    placeholder="Mesajınızı buraya yazın..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  {t('contact.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title wow fadeInUp animated" data-wow-delay="0.3s">Sıkça Sorulan Sorular</h2>
          <div className="faq-grid">
            <div className="faq-item wow fadeInUp animated" data-wow-delay="0.4s">
              <h3>Rezervasyon nasıl yapabilirim?</h3>
              <p>Web sitemiz üzerinden online rezervasyon yapabilir veya telefon ile bizimle iletişime geçebilirsiniz.</p>
            </div>
            
            <div className="faq-item wow fadeInUp animated" data-wow-delay="0.5s">
              <h3>Hangi belgeler gereklidir?</h3>
              <p>Ehliyet, kimlik belgesi ve kredi kartı gereklidir. Uluslararası ehliyet yurt dışından gelen müşteriler için geçerlidir.</p>
            </div>
            
            <div className="faq-item wow fadeInUp animated" data-wow-delay="0.6s">
              <h3>Yaş sınırı var mı?</h3>
              <p>Minimum 21 yaşında olmanız gerekmektedir. 25 yaş altı müşteriler için ek ücret uygulanabilir.</p>
            </div>
            
            <div className="faq-item wow fadeInUp animated" data-wow-delay="0.7s">
              <h3>İptal politikası nedir?</h3>
              <p>Rezervasyon tarihinden 24 saat öncesine kadar ücretsiz iptal edebilirsiniz.</p>
            </div>
            
            <div className="faq-item wow fadeInUp animated" data-wow-delay="0.8s">
              <h3>Yakıt politikası nasıl?</h3>
              <p>Araçları dolu teslim alır, dolu teslim edersiniz. Eksik yakıt için ücret alınır.</p>
            </div>
            
            <div className="faq-item wow fadeInUp animated" data-wow-delay="0.9s">
              <h3>7/24 destek var mı?</h3>
              <p>Evet, acil durumlar için 7/24 destek hattımız mevcuttur.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
