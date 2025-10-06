import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import { useLanguage } from '../hooks/useLanguage';
import '../styles/vehicle-detail.css';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  const isTR = currentLanguage === 'tr';
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // id değiştiğinde de en üste scroll yap (benzer araca geçişte)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [id]);
  const [bookingForm, setBookingForm] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '',
    returnTime: '',
    pickupLocation: '',
    returnLocation: '',
    driverAge: '',
    additionalDriver: false,
    insurance: 'basic'
  });

  // Örnek araç verileri
  const vehicleData = {
    1: {
      id: 1,
      name: 'BMW 3 Series',
      category: 'Premium',
      images: [
        `${import.meta.env.BASE_URL}assets/images/toyota_corolla.png`,
        `${import.meta.env.BASE_URL}assets/images/renault_megane.jpg`,
        `${import.meta.env.BASE_URL}assets/images/audi_a4.png`
      ],
      price: 450,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 2,
      features: ['Klima','GPS', 'Bluetooth'],
      description: 'BMW 3 Series, lüks ve performansı bir arada sunan premium sınıf bir sedan. Konforlu sürüş deneyimi ve modern teknolojileri ile seyahatinizi keyifli hale getirir.',
      specifications: {
        engine: '2.0L Turbo',
        power: '184 HP',
        acceleration: '7.1 saniye',
        topSpeed: '235 km/h',
        fuelConsumption: '6.2L/100km'
      }
    }
  };

  useEffect(() => {
    // Vehicles sayfasından state ile geldiyse onu kullan
    if (location.state && location.state.vehicle) {
      const v = location.state.vehicle;
      const normalized = v.images && Array.isArray(v.images)
        ? v
        : { ...v, images: v.image ? [v.image] : [] };
      setVehicle(normalized);
      setLoading(false);
      return;
    }
    // Aksi halde basit mock veriden id ile yükle (varsa)
    setTimeout(() => {
      setVehicle(vehicleData[id]);
      setLoading(false);
    }, 400);
  }, [id, location.state]);

  const handleBookingFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const phone = '+905555555555';
    const message = `Merhaba, ${vehicle?.name || 'araç'} için rezervasyon yapmak istiyorum. Fiyat: ₺${vehicle?.price || ''} / gün`;
    const url = `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return <Loading message="Araç detayları yükleniyor..." />;
  }

  if (!vehicle) {
    return (
      <div className="container">
        <div className="error-page">
          <h2>Araç bulunamadı</h2>
          <p>Aradığınız araç mevcut değil.</p>
          <button className="btn btn-primary" onClick={() => navigate('/vehicles')}>
            Araçlara Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vehicle-detail-page">
      

      <div className="container">
        <div className="vehicle-detail">
          {/* Vehicle Images */}
          <div className="vehicle-images">
            <div className="main-image">
              <img
                src={(vehicle && vehicle.images && vehicle.images[selectedImage]) || (vehicle && vehicle.image) || ''}
                alt={vehicle.name}
                className="vehicle-main-image"
                loading="lazy"
                sizes="(max-width: 992px) 100vw, 60vw"
                decoding="async"
              />
            </div>
            {/* Thumbnail galerisi kaldırıldı; gerekirse tekrar eklenebilir */}
            <div className="image-info-block">
              <div className="vehicle-features">
                <h3>{t('vehicle.features')}</h3>
                <div className="features-grid">
                  {vehicle.features && vehicle.features.length > 0 ? (
                    vehicle.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))
                  ) : (
                    <>
                    </>
                  )}
                </div>
                <div className="features-demo-text">
                  <p>{t('vehicle.sample_desc_p1')}</p>
                  <ul>
                    <li>{t('vehicle.sample_bullet_1')}</li>
                    <li>{t('vehicle.sample_bullet_2')}</li>
                    <li>{t('vehicle.sample_bullet_3')}</li>
                    <li>{t('vehicle.sample_bullet_4')}</li>
                  </ul>
                </div>
              </div>
              <div className="vehicle-description">
                <h3>{t('vehicle.description')}</h3>
                <p>{vehicle.description || t('vehicle.sample_desc_fallback')}</p>
                <p>{t('vehicle.sample_desc_p2')}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="vehicle-info">
            <div className="vehicle-header">
              <h1>{vehicle.name}</h1>
              <span className="vehicle-category">{vehicle.category}</span>
            </div>

            <div className="vehicle-meta">
              <div className="rating" aria-label="araç puanı">
                ★★★★☆
                <span className="rating-count">(124)</span>
              </div>
            </div>

            <div className="vehicle-price">
              <span className="price">₺{vehicle.price}</span>
              <span className="price-period">/{t('common.per_day')}</span>
            </div>

            <div className="quick-specs">
              <div className="quick-spec-item"><span>⛽ {t('vehicle.fuel')}:</span><strong>{vehicle.fuelType || t('common.unknown')}</strong></div>
              <div className="quick-spec-item"><span>⚙️ {t('vehicle.transmission')}:</span><strong>{vehicle.transmission || t('common.unknown')}</strong></div>
              <div className="quick-spec-item"><span>👥 {t('vehicle.passengers')}:</span><strong>{vehicle.passengers || '-'}</strong></div>
              <div className="quick-spec-item"><span>🚪 {t('vehicle.doors')}:</span><strong>{vehicle.doors || '-'}</strong></div>
              <div className="quick-spec-item"><span>🧳 {t('vehicle.bags')}:</span><strong>{vehicle.bags || '-'}</strong></div>
            </div>

            <div className="cta-row">
              <button className="btn btn-primary btn-icon" onClick={handleBooking}>🗓️ {t('vehicle.book_now')}</button>
            </div>

            <div className="divider"></div>

            {/* vehicle-specs kaldırıldı */}

            

            {vehicle.specifications && Object.keys(vehicle.specifications).length > 0 && (
              <div className="vehicle-specifications">
                <h3>{t('vehicle.specs')}</h3>
                <div className="specs-grid">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          
        </div>
        {/* Related Vehicles */}
        <div className="related-section">
          <div className="related-header">
            <h3>{t('vehicle.related')}</h3>
          </div>
          <div className="related-grid">
            {[1,2,3,4].map((i) => {
              const relatedImages = [
                `${import.meta.env.BASE_URL}assets/images/renault_megane.jpg`,
                `${import.meta.env.BASE_URL}assets/images/mercedes_vito.jpg`,
                `${import.meta.env.BASE_URL}assets/images/audi_a5.webp`,
                `${import.meta.env.BASE_URL}assets/images/dacia_duster.jpg`
              ];
              const relatedNames = [
                'Renault Megane',
                'Mercedes Vito',
                'Audi A5',
                'Dacia Duster'
              ];
              const fallback = {
                id: i,
                name: 'Örnek Araç',
                category: 'Economy',
                price: 300,
                image: `${import.meta.env.BASE_URL}assets/images/dacia_duster.jpg`
              };
              const current = vehicle && vehicle.category ? vehicle.category : 'Economy';
              const suggestions = [
                {
                  id: `${vehicle?.id || 0}-${i}`,
                  name: relatedNames[i - 1] || fallback.name,
                  category: current,
                  price: (vehicle?.price || 300) + i * 20,
                  image: relatedImages[i - 1] || vehicle?.images?.[0] || vehicle?.image || fallback.image
                }
              ];
              const item = suggestions[0] || fallback;
              return (
                <div key={item.id} className="related-card">
                  <img src={item.image} alt={item.name} className="related-image" loading="lazy" decoding="async" />
                  <div className="related-info">
                    <div className="related-top">
                      <span className="related-name">{item.name}</span>
                      <div className="related-price">
                        <span className="price">₺{item.price}</span>
                        <span className="price-period">/{t('common.per_day')}</span>
                      </div>
                    </div>
                    <div className="related-sub">
                      <span className="related-category">{item.category}</span>
                    </div>
                    <div className="related-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          navigate(`${isTR ? '/arac' : '/vehicle'}/${item.id}`, {
                            state: { vehicle: item },
                          })
                        }
                      >
                        {t('vehicle.details')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Fixed WhatsApp Button */}
      <div className="fixed-social">
        <a href="https://wa.me/+905555555555" target="_blank" className="whatsapp" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
          <i className="fa-brands fa-whatsapp"></i>
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

export default VehicleDetail;
