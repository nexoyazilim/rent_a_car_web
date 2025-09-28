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
      name: 'Ahmet Yılmaz',
      position: 'Genel Müdür',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      description: '15 yıllık sektör deneyimi'
    },
    {
      name: 'Ayşe Demir',
      position: 'Operasyon Müdürü',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      description: 'Müşteri memnuniyeti uzmanı'
    },
    {
      name: 'Mehmet Kaya',
      position: 'Teknik Sorumlu',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      description: 'Araç bakım ve onarım uzmanı'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Güvenilirlik',
      description: 'Müşterilerimize her zaman güvenilir hizmet sunuyoruz.'
    },
    {
      icon: '💎',
      title: 'Kalite',
      description: 'En kaliteli araçları ve hizmetleri sunmaya odaklanıyoruz.'
    },
    {
      icon: '🤝',
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyeti bizim önceliğimizdir.'
    },
    {
      icon: '⚡',
      title: 'Hızlı Hizmet',
      description: 'Hızlı ve etkili çözümler sunuyoruz.'
    }
  ];

  return (
    <div className="about-page">
      {/* Breadcrumb Section */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 bg_img pos_relative" style={{backgroundImage: 'url(/assets/images/renault_clio.png)', backgroundPosition: 'bottom'}}>
        <div className="overlay"></div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="breadcrumb-navigation-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs_content align_center_center">
                <div className="breadcrumb-wrapper-inner">
                  <span>
                    <a title="Homepage" href="/">Anasayfa</a>
                  </span>
                  <span>Hakkımızda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mv-container">
            <div className="mv-card mission-card wow fadeInLeft animated" data-wow-delay="0.3s">
              <div className="mv-icon-wrapper">
                <div className="mv-icon mission-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div className="mv-content">
                <h3>Misyonumuz</h3>
                <p>
                  Müşterilerimize güvenli, konforlu ve uygun fiyatlı araç kiralama 
                  hizmeti sunarak, seyahat deneyimlerini en üst seviyeye çıkarmak.
                </p>
              </div>
            </div>
            
            <div className="mv-card vision-card wow fadeInUp animated" data-wow-delay="0.5s">
              <div className="mv-icon-wrapper">
                <div className="mv-icon vision-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </div>
              </div>
              <div className="mv-content">
                <h3>Vizyonumuz</h3>
                <p>
                  Türkiye'nin en güvenilir ve tercih edilen araç kiralama şirketi 
                  olmak ve sektörde standartları belirleyen lider konumumuzu sürdürmek.
                </p>
              </div>
            </div>
            
            <div className="mv-card values-card wow fadeInRight animated" data-wow-delay="0.7s">
              <div className="mv-icon-wrapper">
                <div className="mv-icon values-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>
              <div className="mv-content">
                <h3>Değerlerimiz</h3>
                <p>
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
            <h2>Değerlerimiz</h2>
            <p>İş yapış şeklimizi belirleyen temel değerlerimiz</p>
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
                />
                <h3>{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item wow fadeInUp animated" data-wow-delay="0.3s">
              <div className="stat-number">10+</div>
              <div className="stat-label">Yıllık Deneyim</div>
            </div>
            <div className="stat-item wow fadeInUp animated" data-wow-delay="0.5s">
              <div className="stat-number">500+</div>
              <div className="stat-label">Araç Filosu</div>
            </div>
            <div className="stat-item wow fadeInUp animated" data-wow-delay="0.7s">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Mutlu Müşteri</div>
            </div>
            <div className="stat-item wow fadeInUp animated" data-wow-delay="0.9s">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Müşteri Desteği</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content wow fadeInUp animated" data-wow-delay="0.3s">
            <h2>Araç Kiralamaya Hazır mısınız?</h2>
            <p>Hemen rezervasyon yapın ve seyahatinizi keyifli hale getirin</p>
            <div className="cta-buttons">
              <a href="/vehicles" className="btn btn-primary btn-lg">
                Araçları Görüntüle
              </a>
              <a href="/contact" className="btn btn-outline btn-lg">
                İletişime Geç
              </a>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default About;
