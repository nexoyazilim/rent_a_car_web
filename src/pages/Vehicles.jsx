import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import { useLanguage } from '../hooks/useLanguage';

const Vehicles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    transmission: '',
    fuelType: '',
    passengers: '',
    sortBy: 'price'
  });

  // Örnek araç verileri
  const vehicleData = [
    {
      id: 1,
      name: 'BMW 3 Series',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      price: 450,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 2,
      features: ['Klima', 'GPS', 'Bluetooth', 'USB']
    },
    {
      id: 2,
      name: 'Mercedes C-Class',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
      price: 550,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 3,
      features: ['Klima', 'GPS', 'WiFi', 'Bluetooth']
    },
    {
      id: 3,
      name: 'Audi A4',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      price: 480,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 2,
      features: ['Klima', 'GPS', 'Bluetooth', 'USB']
    },
    {
      id: 4,
      name: 'Volkswagen Golf',
      category: 'Compact',
      image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
      price: 280,
      transmission: 'Manuel',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 2,
      features: ['Klima', 'Bluetooth', 'USB']
    },
    {
      id: 5,
      name: 'Toyota Corolla',
      category: 'Economy',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      price: 220,
      transmission: 'Otomatik',
      fuelType: 'Hibrit',
      passengers: 5,
      doors: 4,
      bags: 2,
      features: ['Klima', 'Bluetooth']
    },
    {
      id: 6,
      name: 'BMW X5',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      price: 650,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 7,
      doors: 5,
      bags: 4,
      features: ['Klima', 'GPS', 'WiFi', 'Bluetooth', 'USB']
    }
  ];

  useEffect(() => {
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setVehicles(vehicleData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.category && vehicle.category !== filters.category) return false;
    if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
    if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
    if (filters.passengers && vehicle.passengers < parseInt(filters.passengers)) return false;
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (vehicle.price < min || vehicle.price > max) return false;
    }
    
    return true;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  if (loading) {
    return <Loading message="Araçlar yükleniyor..." />;
  }

  return (
    <div className="vehicles-page">
      {/* Breadcrumb Section */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 bg_img pos_relative" style={{backgroundImage: 'url(/assets/images/renault_clio.png)', backgroundPosition: 'bottom'}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs_content align_center_center">
                <h3 className="text-uppercase color_ff" style={{paddingBottom: '20px', color: '#fff', textTransform: 'uppercase', marginTop: '130px'}}>Araçlarımız</h3>
                <ol className="breadcrumb">
                  <li><a href="/">Ana Sayfa</a></li>
                  <li className="active">Araçlarımız</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-header">
          <h1>Mevcut Araçlar</h1>
          <p>Size uygun aracı bulun ve rezervasyon yapın</p>
        </div>

        <div className="vehicles-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <h3>Filtreler</h3>
            
            <div className="filter-group">
              <label className="form-label">Kategori</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tüm Kategoriler</option>
                <option value="Economy">Ekonomik</option>
                <option value="Compact">Kompakt</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Lüks</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Fiyat Aralığı</label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tüm Fiyatlar</option>
                <option value="0-300">₺0 - ₺300</option>
                <option value="300-500">₺300 - ₺500</option>
                <option value="500-700">₺500 - ₺700</option>
                <option value="700-1000">₺700+</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Vites</label>
              <select
                name="transmission"
                value={filters.transmission}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tüm Vitesler</option>
                <option value="Otomatik">Otomatik</option>
                <option value="Manuel">Manuel</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Yakıt Tipi</label>
              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tüm Yakıt Tipleri</option>
                <option value="Benzin">Benzin</option>
                <option value="Dizel">Dizel</option>
                <option value="Hibrit">Hibrit</option>
                <option value="Elektrik">Elektrik</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Yolcu Sayısı</label>
              <select
                name="passengers"
                value={filters.passengers}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tüm Yolcu Sayıları</option>
                <option value="2">2+ kişi</option>
                <option value="4">4+ kişi</option>
                <option value="5">5+ kişi</option>
                <option value="7">7+ kişi</option>
              </select>
            </div>

            <button
              className="btn btn-outline w-full"
              onClick={() => setFilters({
                category: '',
                priceRange: '',
                transmission: '',
                fuelType: '',
                passengers: '',
                sortBy: 'price'
              })}
            >
              Filtreleri Temizle
            </button>
          </div>

          {/* Vehicles Grid */}
          <div className="vehicles-main">
            <div className="vehicles-header">
              <p>{sortedVehicles.length} araç bulundu</p>
              <div className="sort-controls">
                <label className="form-label">Sırala:</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="price">Fiyata Göre</option>
                  <option value="name">İsme Göre</option>
                  <option value="category">Kategoriye Göre</option>
                </select>
              </div>
            </div>

            <div className="vehicle-grid">
              {sortedVehicles.map((vehicle) => (
                <div key={vehicle.id} className="vehicle-card">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-image"
                  />
                  <div className="vehicle-info">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <p className="vehicle-category">{vehicle.category}</p>
                    
                    <div className="vehicle-specs">
                      <span>👥 {vehicle.passengers} kişi</span>
                      <span>🚪 {vehicle.doors} kapı</span>
                      <span>🧳 {vehicle.bags} bavul</span>
                      <span>⚙️ {vehicle.transmission}</span>
                      <span>⛽ {vehicle.fuelType}</span>
                    </div>
                    
                    <div className="vehicle-features">
                      {vehicle.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
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
              ))}
            </div>

            {sortedVehicles.length === 0 && (
              <div className="no-results">
                <h3>Arama kriterlerinize uygun araç bulunamadı</h3>
                <p>Filtreleri değiştirerek tekrar deneyin</p>
              </div>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
