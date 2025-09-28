import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
      ],
      price: 450,
      transmission: 'Otomatik',
      fuelType: 'Benzin',
      passengers: 5,
      doors: 4,
      bags: 2,
      features: ['Klima', 'GPS', 'Bluetooth', 'USB', 'Deri Döşeme', 'Elektrikli Camlar'],
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
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setVehicle(vehicleData[id]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBookingFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // Rezervasyon işlemi
    navigate('/booking', { state: { vehicle, bookingForm } });
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
                src={vehicle.images[selectedImage]}
                alt={vehicle.name}
                className="vehicle-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {vehicle.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${vehicle.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="vehicle-info">
            <div className="vehicle-header">
              <h1>{vehicle.name}</h1>
              <span className="vehicle-category">{vehicle.category}</span>
            </div>

            <div className="vehicle-price">
              <span className="price">₺{vehicle.price}</span>
              <span className="price-period">/gün</span>
            </div>

            <div className="vehicle-specs">
              <div className="spec-item">
                <span className="spec-icon">👥</span>
                <span>{vehicle.passengers} kişi</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🚪</span>
                <span>{vehicle.doors} kapı</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🧳</span>
                <span>{vehicle.bags} bavul</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⚙️</span>
                <span>{vehicle.transmission}</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⛽</span>
                <span>{vehicle.fuelType}</span>
              </div>
            </div>

            <div className="vehicle-features">
              <h3>Özellikler</h3>
              <div className="features-grid">
                {vehicle.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="vehicle-description">
              <h3>Açıklama</h3>
              <p>{vehicle.description}</p>
            </div>

            <div className="vehicle-specifications">
              <h3>Teknik Özellikler</h3>
              <div className="specs-grid">
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <span className="spec-label">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form-container">
            <div className="booking-form">
              <h3>Rezervasyon Yap</h3>
              <form onSubmit={handleBooking}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Alış Tarihi</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={bookingForm.pickupDate}
                      onChange={handleBookingFormChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teslim Tarihi</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={bookingForm.returnDate}
                      onChange={handleBookingFormChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Alış Saati</label>
                    <select
                      name="pickupTime"
                      value={bookingForm.pickupTime}
                      onChange={handleBookingFormChange}
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
                      name="returnTime"
                      value={bookingForm.returnTime}
                      onChange={handleBookingFormChange}
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
                      name="pickupLocation"
                      value={bookingForm.pickupLocation}
                      onChange={handleBookingFormChange}
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
                      value={bookingForm.returnLocation}
                      onChange={handleBookingFormChange}
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
                  <label className="form-label">Sürücü Yaşı</label>
                  <select
                    name="driverAge"
                    value={bookingForm.driverAge}
                    onChange={handleBookingFormChange}
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

                <div className="form-group">
                  <label className="form-label">Sigorta Seçimi</label>
                  <select
                    name="insurance"
                    value={bookingForm.insurance}
                    onChange={handleBookingFormChange}
                    className="form-select"
                    required
                  >
                    <option value="basic">Temel Sigorta</option>
                    <option value="full">Tam Sigorta</option>
                    <option value="premium">Premium Sigorta</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="additionalDriver"
                      checked={bookingForm.additionalDriver}
                      onChange={handleBookingFormChange}
                    />
                    Ek sürücü ekle
                  </label>
                </div>

                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Araç Kiralama (3 gün)</span>
                    <span>₺{vehicle.price * 3}</span>
                  </div>
                  <div className="summary-row">
                    <span>Sigorta</span>
                    <span>₺50</span>
                  </div>
                  <div className="summary-row total">
                    <span>Toplam</span>
                    <span>₺{vehicle.price * 3 + 50}</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full">
                  Rezervasyon Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
