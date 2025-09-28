import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';

const Booking = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [bookingData, setBookingData] = useState({
    vehicle: null,
    dates: {
      pickupDate: '',
      returnDate: '',
      pickupTime: '',
      returnTime: ''
    },
    locations: {
      pickupLocation: '',
      returnLocation: ''
    },
    driver: {
      name: '',
      email: '',
      phone: '',
      age: '',
      licenseNumber: '',
      licenseExpiry: '',
      additionalDriver: false
    },
    insurance: 'basic',
    extras: [],
    payment: {
      method: 'credit-card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    }
  });

  useEffect(() => {
    if (location.state) {
      setBookingData(prev => ({
        ...prev,
        vehicle: location.state.vehicle,
        dates: {
          ...prev.dates,
          ...location.state.bookingForm
        }
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.includes('.') ? name.split('.') : ['', name];
    
    if (section) {
      setBookingData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setLoading(false);
      alert('Rezervasyonunuz başarıyla tamamlandı!');
      navigate('/');
    }, 2000);
  };

  const calculateTotal = () => {
    if (!bookingData.vehicle) return 0;
    
    const startDate = new Date(bookingData.dates.pickupDate);
    const endDate = new Date(bookingData.dates.returnDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const basePrice = bookingData.vehicle.price * days;
    const insurancePrice = bookingData.insurance === 'basic' ? 50 : 
                          bookingData.insurance === 'full' ? 100 : 150;
    
    return basePrice + insurancePrice;
  };

  if (loading) {
    return <Loading message="Rezervasyon işlemi tamamlanıyor..." />;
  }

  if (!bookingData.vehicle) {
    return (
      <div className="container">
        <div className="error-page">
          <h2>Rezervasyon bilgileri bulunamadı</h2>
          <p>Lütfen önce bir araç seçin.</p>
          <button className="btn btn-primary" onClick={() => navigate('/vehicles')}>
            Araçları Görüntüle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Breadcrumb Section */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 bg_img pos_relative" style={{backgroundImage: 'url(/assets/images/renault_clio.png)', backgroundPosition: 'bottom'}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs_content align_center_center">
                <h3 className="text-uppercase color_ff" style={{paddingBottom: '20px', color: '#fff', textTransform: 'uppercase', marginTop: '130px'}}>Rezervasyon</h3>
                <ol className="breadcrumb">
                  <li><a href="/">Ana Sayfa</a></li>
                  <li><a href="/vehicles">Araçlarımız</a></li>
                  <li className="active">Rezervasyon</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="booking-header">
          <h1>Rezervasyon</h1>
          <div className="booking-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Tarih & Lokasyon</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Sürücü Bilgileri</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Ödeme</span>
            </div>
          </div>
        </div>

        <div className="booking-content">
          <div className="booking-form-section">
            {step === 1 && (
              <div className="booking-step">
                <h2>Tarih ve Lokasyon Bilgileri</h2>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Alış Tarihi</label>
                      <input
                        type="date"
                        name="dates.pickupDate"
                        value={bookingData.dates.pickupDate}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Teslim Tarihi</label>
                      <input
                        type="date"
                        name="dates.returnDate"
                        value={bookingData.dates.returnDate}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Alış Saati</label>
                      <select
                        name="dates.pickupTime"
                        value={bookingData.dates.pickupTime}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Saat Seçin</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Teslim Saati</label>
                      <select
                        name="dates.returnTime"
                        value={bookingData.dates.returnTime}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Saat Seçin</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Alış Lokasyonu</label>
                      <select
                        name="locations.pickupLocation"
                        value={bookingData.locations.pickupLocation}
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
                        name="locations.returnLocation"
                        value={bookingData.locations.returnLocation}
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

                  <div className="form-group">
                    <label className="form-label">Sigorta Seçimi</label>
                    <select
                      name="insurance"
                      value={bookingData.insurance}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="basic">Temel Sigorta (₺50)</option>
                      <option value="full">Tam Sigorta (₺100)</option>
                      <option value="premium">Premium Sigorta (₺150)</option>
                    </select>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                      Devam Et
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step">
                <h2>Sürücü Bilgileri</h2>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Ad Soyad</label>
                      <input
                        type="text"
                        name="driver.name"
                        value={bookingData.driver.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-posta</label>
                      <input
                        type="email"
                        name="driver.email"
                        value={bookingData.driver.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Telefon</label>
                      <input
                        type="tel"
                        name="driver.phone"
                        value={bookingData.driver.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Yaş</label>
                      <select
                        name="driver.age"
                        value={bookingData.driver.age}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Yaş Seçin</option>
                        <option value="21-24">21-24</option>
                        <option value="25-29">25-29</option>
                        <option value="30-39">30-39</option>
                        <option value="40-49">40-49</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Ehliyet Numarası</label>
                      <input
                        type="text"
                        name="driver.licenseNumber"
                        value={bookingData.driver.licenseNumber}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ehliyet Geçerlilik Tarihi</label>
                      <input
                        type="date"
                        name="driver.licenseExpiry"
                        value={bookingData.driver.licenseExpiry}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="driver.additionalDriver"
                        checked={bookingData.driver.additionalDriver}
                        onChange={handleInputChange}
                      />
                      Ek sürücü ekle
                    </label>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn btn-outline" onClick={handlePrevious}>
                      Geri
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                      Devam Et
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="booking-step">
                <h2>Ödeme Bilgileri</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Ödeme Yöntemi</label>
                    <select
                      name="payment.method"
                      value={bookingData.payment.method}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="credit-card">Kredi Kartı</option>
                      <option value="debit-card">Banka Kartı</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kart Üzerindeki İsim</label>
                    <input
                      type="text"
                      name="payment.cardName"
                      value={bookingData.payment.cardName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kart Numarası</label>
                    <input
                      type="text"
                      name="payment.cardNumber"
                      value={bookingData.payment.cardNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Son Kullanma Tarihi</label>
                      <input
                        type="text"
                        name="payment.expiryDate"
                        value={bookingData.payment.expiryDate}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        name="payment.cvv"
                        value={bookingData.payment.cvv}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn btn-outline" onClick={handlePrevious}>
                      Geri
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Rezervasyonu Tamamla
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
            <h3>Rezervasyon Özeti</h3>
            
            <div className="summary-vehicle">
              <img
                src={bookingData.vehicle.images[0]}
                alt={bookingData.vehicle.name}
                className="summary-vehicle-image"
              />
              <div className="summary-vehicle-info">
                <h4>{bookingData.vehicle.name}</h4>
                <p>{bookingData.vehicle.category}</p>
              </div>
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Alış Tarihi:</span>
                <span>{bookingData.dates.pickupDate}</span>
              </div>
              <div className="summary-row">
                <span>Teslim Tarihi:</span>
                <span>{bookingData.dates.returnDate}</span>
              </div>
              <div className="summary-row">
                <span>Alış Lokasyonu:</span>
                <span>{bookingData.locations.pickupLocation}</span>
              </div>
              <div className="summary-row">
                <span>Teslim Lokasyonu:</span>
                <span>{bookingData.locations.returnLocation}</span>
              </div>
            </div>

            <div className="summary-pricing">
              <div className="summary-row">
                <span>Araç Kiralama:</span>
                <span>₺{bookingData.vehicle.price * 3}</span>
              </div>
              <div className="summary-row">
                <span>Sigorta:</span>
                <span>₺{bookingData.insurance === 'basic' ? 50 : bookingData.insurance === 'full' ? 100 : 150}</span>
              </div>
              <div className="summary-row total">
                <span>Toplam:</span>
                <span>₺{calculateTotal()}</span>
              </div>
            </div>
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
          <span className="flag">🇹🇷</span>
        </button>
        <div className="language-dropdown">
          <button className="language-option active">
            <span className="flag">🇹🇷</span>
          </button>
          <button className="language-option">
            <span className="flag">🇺🇸</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
