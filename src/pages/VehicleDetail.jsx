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

  // Yardımcı: yakıt ve vites değerlerini i18n anahtarlarına eşle
  const getTranslatedFuel = (fuel) => {
    if (!fuel) return t('vehicleDetail.unknown', { defaultValue: 'Bilinmiyor' });
    const v = String(fuel).toLowerCase();
    if (v.includes('benzin') || v.includes('petrol') || v.includes('gasoline')) return t('common.fuel_petrol', { defaultValue: 'Benzin' });
    if (v.includes('dizel') || v.includes('diesel')) return t('common.fuel_diesel', { defaultValue: 'Dizel' });
    if (v.includes('hibrit') || v.includes('hybrid')) return t('common.fuel_hybrid', { defaultValue: 'Hibrit' });
    if (v.includes('elektr') || v.includes('electric')) return t('common.fuel_electric', { defaultValue: 'Elektrik' });
    return fuel;
  };

  const getTranslatedTransmission = (tr) => {
    if (!tr) return t('vehicleDetail.unknown', { defaultValue: 'Bilinmiyor' });
    const v = String(tr).toLowerCase();
    if (v.includes('otom') || v.includes('auto')) return t('common.transmission_automatic', { defaultValue: 'Otomatik' });
    if (v.includes('manuel') || v.includes('manual')) return t('common.transmission_manual', { defaultValue: 'Manuel' });
    return tr;
  };

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
        '/assets/images/toyota_corolla.png',
        '/assets/images/renault_megane.jpg',
        '/assets/images/audi_a4.png'
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
    return <Loading message={t('vehicleDetail.loading', { defaultValue: 'Araç detayları yükleniyor...' })} />;
  }

  if (!vehicle) {
    return (
      <div className="container">
        <div className="error-page">
          <h2>{t('vehicleDetail.not_found_title', { defaultValue: 'Araç bulunamadı' })}</h2>
          <p>{t('vehicleDetail.not_found_desc', { defaultValue: 'Aradığınız araç mevcut değil.' })}</p>
          <button className="btn btn-primary" onClick={() => navigate('/vehicles')}>
            {t('vehicleDetail.back_to_list', { defaultValue: 'Araçlara Dön' })}
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
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="image-thumbnails">
                {vehicle.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${vehicle.name} ${index + 1}`}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    loading="lazy"
                    sizes="(max-width: 992px) 30vw, 18vw"
                    decoding="async"
                  />
                ))}
              </div>
            )}
            <div className="image-info-block">
              <div className="vehicle-features">
                <h3>{t('vehicleDetail.features_title', { defaultValue: 'Özellikler' })}</h3>
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
                  <p>
                    {t('vehicleDetail.features_paragraph', { defaultValue: 'Bu model; konforlu süspansiyon sistemi, gelişmiş güvenlik teknolojileri ve uzun yolculuklarda yormayan ergonomik koltuk yapısıyla öne çıkar. Güncel multimedya ekranı, kablosuz bağlantı seçenekleri ve akıllı sürüş destekleri ile modern bir sürüş deneyimi sunar.' })}
                  </p>
                  <ul>
                    <li>{t('vehicleDetail.features_item_1', { defaultValue: 'Uyarlanabilir hız sabitleme ve şerit takip asistanı' })}</li>
                    <li>{t('vehicleDetail.features_item_2', { defaultValue: 'Çift bölgeli otomatik klima ve arka havalandırma' })}</li>
                    <li>{t('vehicleDetail.features_item_3', { defaultValue: 'LED farlar, otomatik uzun/kısa far geçişi' })}</li>
                    <li>{t('vehicleDetail.features_item_4', { defaultValue: 'Android Auto & Apple CarPlay desteği' })}</li>
                  </ul>
                </div>
              </div>
              <div className="vehicle-description">
                <h3>{t('vehicleDetail.description_title', { defaultValue: 'Açıklama' })}</h3>
                <p>{vehicle.description || t('vehicleDetail.description_paragraph_1', { defaultValue: 'Şehir içi kullanımlarda düşük yakıt tüketimiyle tasarruf sağlar; şehir dışı uzun yollarda ise sessiz kabini ve stabil yol tutuşuyla güven verir.' })}</p>
                <p>
                  {t('vehicleDetail.description_paragraph_2', { defaultValue: 'Şehir içi kullanımlarda düşük yakıt tüketimiyle tasarruf sağlar; şehir dışı uzun yollarda ise sessiz kabini ve stabil yol tutuşuyla güven verir. Geniş bagaj hacmi, aile ve iş seyahatlerinde ihtiyaç duyacağınız alanı sunarken; pratik depolama gözleri günlük yaşamınızı kolaylaştırır.' })}
                </p>
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
              <div className="quick-spec-item"><span>⛽ {t('vehicleDetail.spec_fuel', { defaultValue: 'Yakıt' })}:</span><strong>{getTranslatedFuel(vehicle.fuelType)}</strong></div>
              <div className="quick-spec-item"><span>⚙️ {t('vehicleDetail.spec_transmission', { defaultValue: 'Vites' })}:</span><strong>{getTranslatedTransmission(vehicle.transmission)}</strong></div>
              <div className="quick-spec-item"><span>👥 {t('vehicleDetail.spec_passengers', { defaultValue: 'Yolcu' })}:</span><strong>{vehicle.passengers || '-'}</strong></div>
              <div className="quick-spec-item"><span>🚪 {t('vehicleDetail.spec_doors', { defaultValue: 'Kapı' })}:</span><strong>{vehicle.doors || '-'}</strong></div>
              <div className="quick-spec-item"><span>🧳 {t('vehicleDetail.spec_bags', { defaultValue: 'Bagaj' })}:</span><strong>{vehicle.bags || '-'}</strong></div>
            </div>

            <div className="cta-row">
              <button className="btn btn-primary btn-icon" onClick={handleBooking}>🗓️ {t('vehicleDetail.reserve_button', { defaultValue: 'Rezervasyon Yap' })}</button>
            </div>

            <div className="divider"></div>

            {/* vehicle-specs kaldırıldı */}

            

            {vehicle.specifications && Object.keys(vehicle.specifications).length > 0 && (
              <div className="vehicle-specifications">
                <h3>{t('vehicleDetail.specs_title', { defaultValue: 'Teknik Özellikler' })}</h3>
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
            <h3>{t('vehicleDetail.related_title', { defaultValue: 'Benzer Araçlar' })}</h3>
          </div>
          <div className="related-grid">
            {[1,2,3,4].map((i) => {
              const relatedImages = [
                '/assets/images/renault_megane.jpg',
                '/assets/images/mercedes_vito.jpg',
                '/assets/images/audi_a5.webp',
                '/assets/images/dacia_duster.jpg'
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
                image: '/assets/images/dacia_duster.jpg'
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
                        {t('vehicleDetail.detail_button', { defaultValue: 'Detay' })}
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
