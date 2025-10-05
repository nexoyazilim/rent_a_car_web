import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';

const About = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  useScrollReveal(); // Initialize scroll reveal animations

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: t('about.team_members.ahmet.name'),
      position: t('about.team_members.ahmet.position'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      description: t('about.team_members.ahmet.desc')
    },
    {
      name: t('about.team_members.ayse.name'),
      position: t('about.team_members.ayse.position'),
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      description: t('about.team_members.ayse.desc')
    },
    {
      name: t('about.team_members.mehmet.name'),
      position: t('about.team_members.mehmet.position'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      description: t('about.team_members.mehmet.desc')
    }
  ];

  const values = [
    { 
      icon: '🎯', 
      title: t('about.values_items.reliability.title', { defaultValue: 'Güvenilirlik' }), 
      description: t('about.values_items.reliability.desc', { defaultValue: 'Müşterilerimize her zaman güvenilir hizmet sunuyoruz.' }) 
    },
    { 
      icon: '💎', 
      title: t('about.values_items.quality.title', { defaultValue: 'Kalite' }), 
      description: t('about.values_items.quality.desc', { defaultValue: 'En kaliteli araçları ve hizmetleri sunmaya odaklanıyoruz.' }) 
    },
    { 
      icon: '🤝', 
      title: t('about.values_items.customer_satisfaction.title', { defaultValue: 'Müşteri Memnuniyeti' }), 
      description: t('about.values_items.customer_satisfaction.desc', { defaultValue: 'Müşteri memnuniyeti bizim önceliğimizdir.' }) 
    },
  ];

  return (
    <div className="about-page">
      {/* Breadcrumb Section */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 bg_img pos_relative breadcrumbs-hero">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs_content align_center_center">
                <h3 className="text-uppercase color_ff breadcrumbs-title">{t('about.title')}</h3>
                <ol className="breadcrumb">
                  <li><a href="/">{t('navigation.home')}</a></li>
                  <li className="active">{t('about.title')}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mv-container">
            <div
              className="mv-card mission-card wow fadeInLeft animated"
              data-wow-delay="0.3s"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0)), url('/assets/images/misyonumuz.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'inherit',
                backgroundRepeat: 'no-repeat',
                minHeight: '420px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
                color: '#ffffff'
              }}
            >
              <div
                className="mv-content"
                style={{
                  textAlign: 'right',
                  maxWidth: '50%',
                  marginLeft: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <p style={{ color: 'inherit' }}>{t('about.mission_text')}</p>
              </div>
            </div>
            
            <div
              className="mv-card vision-card wow fadeInUp animated"
              data-wow-delay="0.5s"
              style={{
                backgroundImage: "linear-gradient(to left, rgba(0,0,0,0.45), rgba(0,0,0,0)), url('/assets/images/vizyonumuz.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'inherit',
                backgroundRepeat: 'no-repeat',
                minHeight: '420px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
                color: '#ffffff'
              }}
            >
              <div
                className="mv-content"
                style={{
                  textAlign: 'right',
                  maxWidth: '50%',
                  marginLeft: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <p style={{ color: 'inherit' }}>{t('about.vision_text')}</p>
              </div>
            </div>
            
            <div
              className="mv-card values-card wow fadeInRight animated"
              data-wow-delay="0.7s"
              style={{
                backgroundImage: "linear-gradient(to left, rgba(0,0,0,0.45), rgba(0,0,0,0)), url('/assets/images/degerlerimiz.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'inherit',
                backgroundRepeat: 'no-repeat',
                minHeight: '420px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
                color: '#ffffff'
              }}
            >
              <div
                className="mv-content"
                style={{
                  textAlign: 'right',
                  maxWidth: '50%',
                  marginLeft: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <p style={{ color: 'inherit' }}>
                  Güvenilirlik, kalite, müşteri memnuniyeti ve sürekli gelişim 
                  değerlerimizle hizmet veriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Detail */}
      <section className="values-detail-section">
        <div className="container">
          <div className="values-header wow fadeInUp animated" data-wow-delay="0.3s">
            <h2>{t('about.values')}</h2>
            <p>{t('about.values_intro')}</p>
          </div>
          <div className="values-container">
            {values.map((value, index) => (
              <div key={index} className="value-item wow fadeInUp animated" data-wow-delay={`${0.4 + index * 0.1}s`}>
                <div className="value-icon-wrapper">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                </div>
                <div className="value-content">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title wow fadeInUp animated" data-wow-delay="0.3s">{t('about.team')}</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card wow fadeInUp animated" data-wow-delay={`${0.4 + index * 0.2}s`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                  loading="lazy"
                  decoding="async"
                />
                <h3>{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed WhatsApp Button */}
      <div className="fixed-social">
        <a href="https://wa.me/+905555555555" target="_blank" className="whatsapp" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
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
    </div>
  );
};

export default About;
