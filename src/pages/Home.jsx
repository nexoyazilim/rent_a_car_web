import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  useScrollReveal();

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Initialize scroll reveal animations
  
  const [searchForm, setSearchForm] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    vehicleType: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Arama parametrelerini URL'e ekleyerek vehicles sayfasına yönlendir
    const params = new URLSearchParams(searchForm);
    navigate(`/vehicles?${params.toString()}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Öne çıkan araçlar
  const featuredVehicles = [
    {
      id: 1,
      name: 'BMW 3 Series',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      price: 450,
      features: ['Otomatik', 'Klima', 'GPS', 'Bluetooth'],
      passengers: 5,
      doors: 4,
      bags: 2
    },
    {
      id: 2,
      name: 'Mercedes C-Class',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
      price: 550,
      features: ['Otomatik', 'Klima', 'GPS', 'WiFi'],
      passengers: 5,
      doors: 4,
      bags: 3
    },
    {
      id: 3,
      name: 'Audi A4',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      price: 480,
      features: ['Otomatik', 'Klima', 'GPS', 'Bluetooth'],
      passengers: 5,
      doors: 4,
      bags: 2
    }
  ];

  // Slider ayarları
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          
          {/* Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-form-grid">
              <div className="form-group">
                <label className="form-label">{t('hero.pickup_date')}</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={searchForm.pickupDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('hero.return_date')}</label>
                <input
                  type="date"
                  name="returnDate"
                  value={searchForm.returnDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Alış Lokasyonu</label>
                <select
                  name="pickupLocation"
                  value={searchForm.pickupLocation}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Lokasyon Seçin</option>
                  <option value="istanbul-airport">İstanbul Havalimanı</option>
                  <option value="sabiha-gokcen">Sabiha Gökçen</option>
                  <option value="taksim">Taksim</option>
                  <option value="kadikoy">Kadıköy</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Teslim Lokasyonu</label>
                <select
                  name="returnLocation"
                  value={searchForm.returnLocation}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Lokasyon Seçin</option>
                  <option value="istanbul-airport">İstanbul Havalimanı</option>
                  <option value="sabiha-gokcen">Sabiha Gökçen</option>
                  <option value="taksim">Taksim</option>
                  <option value="kadikoy">Kadıköy</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg">
              {t('hero.search_button')}
            </button>
          </form>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="featured-vehicles">
        <div className="container">
          <div className="section-header">
            <h2>Öne Çıkan Araçlar</h2>
            <p>En popüler ve kaliteli araçlarımızı keşfedin</p>
          </div>
          
          <Slider {...sliderSettings}>
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-slide">
                <div className="vehicle-card">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-image"
                  />
                  <div className="vehicle-info">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <p className="vehicle-category">{vehicle.category}</p>
                    
                    <div className="vehicle-features">
                      {vehicle.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="vehicle-specs">
                      <span>👥 {vehicle.passengers} kişi</span>
                      <span>🚪 {vehicle.doors} kapı</span>
                      <span>🧳 {vehicle.bags} bavul</span>
                    </div>
                    
                    <div className="vehicle-price">
                      <div className="price">
                        ₺{vehicle.price}
                        <span className="price-period">/gün</span>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                      >
                        Detaylar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

       {/* Features Section */}
       <section className="features" aria-label="section">
         <div className="container">
           <div className="row align-items-center">
             <div className="col-lg-6 offset-lg-3 text-center">
               <h2>Sürüş Keyfi Başlıyor!</h2>
               <p>En yeni model araçlarımızla sürüş keyfinizi katlayın. İster lüks segment, ister ekonomik seçenekler arayın, size en uygun aracı bulmak artık çok kolay. Hemen araçlarımızı keşfedin ve rezervasyon yapın!</p>
               <div className="spacer-20"></div>
             </div>
             <div className="clearfix"></div>
             <div className="col-lg-3">
               <div className="box-icon s2 wow fadeInRight animated" data-wow-delay="0.5s">
                 <i className="fa bg-color fa-trophy">🏆</i>
                 <div className="d-inner">
                   <h4>Birinci sınıf hizmetler</h4>
                   <p>Lüksün olağanüstü özenle buluştuğu, unutulmaz anlar yaratan ve tüm beklentilerinizi aşan yer.</p>
                 </div>
               </div>
               <div className="box-icon s2 wow fadeInRight animated" data-wow-delay="0.75s">
                 <i className="fa bg-color fa-road">🛣️</i>
                 <div className="d-inner">
                   <h4>7/24 yol asistanı</h4>
                   <p>7/24 Yol Asistanı hizmetimizle, yolculuğunuz boyunca her an yanınızdayız.</p>
                 </div>
               </div>
             </div>
             <div className="col-lg-6">
               <img 
                 src="/assets/images/toyota_corolla.png" 
                 alt="Toyota Corolla Altis - Araç Kiralama" 
                 className="wow fadeInUp animated" 
                 data-wow-delay="0.3s"
                 style={{
                   width: '100%',
                   height: 'auto',
                   maxWidth: '500px',
                   display: 'block',
                   margin: '0 auto'
                 }}
               />
             </div>
             <div className="col-lg-3">
               <div className="box-icon s2 d-invert wow fadeInLeft animated" data-wow-delay="1s">
                 <i className="fa bg-color fa-tag">💰</i>
                 <div className="d-inner">
                   <h4>Minimum Maliyetle Kalite</h4>
                   <p>Bütçenize uygun araç kiralama seçenekleri ile en kaliteli hizmeti sunuyoruz. Farklı ödeme seçenekleri ve kampanyalarımızla, her zaman avantajlısınız.</p>
                 </div>
               </div>
               <div className="box-icon s2 d-invert wow fadeInLeft animated" data-wow-delay="1.25s">
                 <i className="fa bg-color fa-map-pin">📍</i>
                 <div className="d-inner">
                   <h4>Hızlı Rezervasyon, Anında Teslimat</h4>
                   <p>Web sitemiz üzerinden sadece birkaç adımda aracınızı rezerve edin, zamandan tasarruf edin.</p>
                 </div>
               </div>
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

export default Home;
