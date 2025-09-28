import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

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
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>{t('about.title')}</h1>
          <p>Güvenilir araç kiralama hizmeti ile 10 yıldır yanınızdayız</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Hikayemiz</h2>
              <p>
                2014 yılında kurulan şirketimiz, müşterilerimize en kaliteli araç kiralama 
                hizmetini sunmak amacıyla yola çıktı. Bugün, geniş araç filosu ve 
                profesyonel ekibimizle binlerce müşteriye hizmet veriyoruz.
              </p>
              <p>
                Teknoloji ve müşteri memnuniyetini birleştirerek, sektörde öncü 
                konumumuzu sürdürüyoruz. Her geçen gün daha iyi hizmet sunmak için 
                çalışmaya devam ediyoruz.
              </p>
            </div>
            <div className="story-image">
              <img
                src="/assets/images/car.png"
                alt="Şirket binamız"
                className="story-img"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '600px',
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

      {/* Mission, Vision, Values */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">🎯</div>
              <h3>{t('about.mission')}</h3>
              <p>
                Müşterilerimize güvenli, konforlu ve uygun fiyatlı araç kiralama 
                hizmeti sunarak, seyahat deneyimlerini en üst seviyeye çıkarmak.
              </p>
            </div>
            
            <div className="mv-card">
              <div className="mv-icon">👁️</div>
              <h3>{t('about.vision')}</h3>
              <p>
                Türkiye'nin en güvenilir ve tercih edilen araç kiralama şirketi 
                olmak ve sektörde standartları belirleyen lider konumumuzu sürdürmek.
              </p>
            </div>
            
            <div className="mv-card">
              <div className="mv-icon">💎</div>
              <h3>{t('about.values')}</h3>
              <p>
                Güvenilirlik, kalite, müşteri memnuniyeti ve sürekli gelişim 
                değerlerimizle hizmet veriyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Detail */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Değerlerimiz</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">{t('about.team')}</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
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
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Yıllık Deneyim</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Araç Filosu</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Mutlu Müşteri</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Müşteri Desteği</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
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
    </div>
  );
};

export default About;
