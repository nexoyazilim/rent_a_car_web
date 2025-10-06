import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import { useLanguage } from '../hooks/useLanguage';
import '../styles/vehicles.css';

const Vehicles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const listTopRef = useRef(null);
  const isTR = currentLanguage === 'tr';
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Drawer açıkken body scroll kilidi
  useEffect(() => {
    if (isFiltersOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isFiltersOpen]);

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filters, setFilters] = useState({
    brand: '',
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
      name: 'Renault Megane',
      brand: 'BMW',
      category: 'Premium',
      image: `${import.meta.env.BASE_URL}assets/images/renault_megane.jpg`,
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
      name: 'Mercedes Vito',
      brand: 'Mercedes',
      category: 'Luxury',
      image: `${import.meta.env.BASE_URL}assets/images/mercedes_vito.jpg`,
      price: 550,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 3,
      features: ['Klima', 'GPS']
    },
    {
      id: 3,
      name: 'Audi A4',
      brand: 'Audi',
      category: 'Premium',
      image: `${import.meta.env.BASE_URL}assets/images/audi_a4.png`,
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
      name: 'Dacia Duster',
      brand: 'Volkswagen',
      category: 'Compact',
      image: `${import.meta.env.BASE_URL}assets/images/dacia_duster.jpg`,
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
      brand: 'Toyota',
      category: 'Economy',
      image: `${import.meta.env.BASE_URL}assets/images/toyota_corolla.png`,
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
      name: 'Fiat Egea',
      brand: 'BMW',
      category: 'SUV',
      image: `${import.meta.env.BASE_URL}assets/images/fiat_egea.jpg`,
      price: 650,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 7,
      doors: 5,
      bags: 4,
      features: ['Klima', 'GPS']
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
    if (filters.brand && vehicle.brand !== filters.brand) return false;
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

  const isFilteringActive = Boolean(
    filters.brand ||
    filters.category ||
    filters.priceRange ||
    filters.transmission ||
    filters.fuelType ||
    filters.passengers
  );

  // Filtre/sıralama değiştiğinde liste başına kaydır
  useEffect(() => {
    if (!listTopRef.current) return;
    const y = listTopRef.current.getBoundingClientRect().top + window.pageYOffset - 90; // fixed header offset
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [filters.brand, filters.category, filters.priceRange, filters.transmission, filters.fuelType, filters.passengers, filters.sortBy]);

  if (loading) {
    return <Loading message={t('vehicles.loading', { defaultValue: 'Araçlar yükleniyor...' })} />;
  }

  return (
    <div className="vehicles-page">
      {/* Breadcrumb Section */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 bg_img pos_relative breadcrumbs-hero">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs_content align_center_center">
                <h3 className="text-uppercase color_ff breadcrumbs-title">{t('vehicles.title')}</h3>
                <ol className="breadcrumb">
                  <li><Link to="/">{t('navigation.home')}</Link></li>
                  <li className="active">{t('vehicles.title')}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-header">
          <h3>{t('vehicles.subtitle')}</h3>
          <button
            className="btn btn-outline filters-toggle-btn"
            onClick={() => setIsFiltersOpen(true)}
            aria-label={t('vehicles.filters')}
          >
            {t('vehicles.filters')}
          </button>
        </div>

        <div className="vehicles-content">
          {/* Filters Sidebar */}
          <div className={`filters-sidebar ${isFiltersOpen ? 'open' : ''}`} aria-hidden={!isFiltersOpen}>
            <div className="filters-sidebar-header">
              <h3>{t('vehicles.filters')}</h3>
              <button className="btn btn-outline filters-close-btn" onClick={() => setIsFiltersOpen(false)} aria-label="Kapat">✕</button>
            </div>
            <div className="filter-group">
              <label className="form-label">{t('vehicles.brand')}</label>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">{t('vehicles.all_brands')}</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="form-label">{t('vehicles.category')}</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">{t('vehicles.all_categories')}</option>
                <option value="Economy">{t('vehicle_categories.economy')}</option>
                <option value="Compact">{t('vehicle_categories.compact')}</option>
                <option value="Premium">{t('vehicle_categories.premium')}</option>
                <option value="Luxury">{t('vehicle_categories.luxury')}</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">{t('vehicles.price_range')}</label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">{t('vehicles.all_prices')}</option>
                <option value="0-300">₺0 - ₺300</option>
                <option value="300-500">₺300 - ₺500</option>
                <option value="500-700">₺500 - ₺700</option>
                <option value="700-1000">₺700+</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">{t('vehicles.transmission')}</label>
              <select
                name="transmission"
                value={filters.transmission}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">{t('vehicles.all_transmissions')}</option>
                <option value="Otomatik">{t('vehicle_features.automatic')}</option>
                <option value="Manuel">{t('vehicle_features.manual')}</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">{t('vehicles.fuel_type')}</label>
              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">{t('vehicles.all_fuels')}</option>
                <option value="Benzin">{t('common.fuel_petrol', { defaultValue: 'Benzin' })}</option>
                <option value="Dizel">{t('common.fuel_diesel', { defaultValue: 'Dizel' })}</option>
                <option value="Hibrit">{t('common.fuel_hybrid', { defaultValue: 'Hibrit' })}</option>
                <option value="Elektrik">{t('common.fuel_electric', { defaultValue: 'Elektrik' })}</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">{t('vehicles.passengers')}</label>
              <select
                name="passengers"
                value={filters.passengers}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">{t('vehicles.all_passengers')}</option>
                <option value="2">2+ kişi</option>
                <option value="4">4+ kişi</option>
                <option value="5">5+ kişi</option>
                <option value="7">7+ kişi</option>
              </select>
            </div>

            <button
              className="btn btn-outline w-full"
              onClick={() => setFilters({
                brand: '',
                category: '',
                priceRange: '',
                transmission: '',
                fuelType: '',
                passengers: '',
                sortBy: 'price'
              })}
            >
              {t('vehicles.clear_filters')}
            </button>
          </div>

          {/* Vehicles Grid */}
          <div className="vehicles-main">
            <div ref={listTopRef} className="vehicles-header">
              <p>{isFilteringActive ? t('vehicles.results', { count: sortedVehicles.length }) : t('vehicles.all_listed')}</p>
              <div className="sort-controls">
                <label className="form-label">{t('vehicles.sort_by')}</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="price">{t('vehicles.sort_price')}</option>
                  <option value="name">{t('vehicles.sort_name')}</option>
                  <option value="category">{t('vehicles.sort_category')}</option>
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
                    loading="lazy"
                    sizes="(max-width: 992px) 100vw, 33vw"
                    decoding="async"
                  />
                  <div className="vehicle-info">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <p className="vehicle-category">{vehicle.category}</p>
                    
                    {/* vehicle-specs kaldırıldı */}
                    
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
                        <span className="price-period">/{t('common.per_day')}</span>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`${isTR ? '/arac' : '/vehicle'}/${vehicle.id}`, { state: { vehicle } })}
                      >
                        {t('vehicles.details')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedVehicles.length === 0 && (
              <div className="no-results">
                <h3>{t('vehicles.no_results_title')}</h3>
                <p>{t('vehicles.no_results_desc')}</p>
              </div>
            )}
          </div>
        </div>
        {isFiltersOpen && (
          <div className="filters-overlay" onClick={() => setIsFiltersOpen(false)} aria-hidden="true"></div>
        )}
      </div>
      
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

export default Vehicles;
