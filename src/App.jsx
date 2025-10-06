import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import RentalTerms from './pages/RentalTerms';
import './App.css';
import { useLanguage } from './hooks/useLanguage';

// İlk yüklemede aktif dile göre URL segmentini normalize eder
const UrlNormalizer = () => {
  const { currentLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const enToTr = {
      '/vehicles': '/araclar',
      '/vehicle': '/arac',
      '/about': '/hakkimizda',
      '/contact': '/iletisim',
      // Rezervasyon sayfası kaldırıldı
    };
    const trToEn = Object.fromEntries(Object.entries(enToTr).map(([en, tr]) => [tr, en]));

    const segments = location.pathname.split('/');
    const first = `/${segments[1] || ''}`;
    let mappedFirst = first;
    if (currentLanguage === 'tr') mappedFirst = enToTr[first] || first;
    else mappedFirst = trToEn[first] || first; // en/ar -> EN slug
    segments[1] = mappedFirst.startsWith('/') ? mappedFirst.slice(1) : mappedFirst;
    const newPath = segments.join('/') || '/';
    if (newPath !== location.pathname) {
      navigate(`${newPath}${location.search}${location.hash}`, { replace: true });
    }
  }, [currentLanguage]);

  return null;
};

// Not: URL'ler dili yansıtan yerel slug'larla eşleştirilecek (önek yok)

function App() {
  return (
    <Router>
      <div className="App">
        <UrlNormalizer />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* EN slugs */}
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/** Rezervasyon sayfası kaldırıldı */}
            <Route path="/rental-terms" element={<RentalTerms />} />
            {/* TR slugs */}
            <Route path="/araclar" element={<Vehicles />} />
            <Route path="/arac/:id" element={<VehicleDetail />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/iletisim" element={<Contact />} />
            {/** Rezervasyon sayfası kaldırıldı */}
            <Route path="/kiralama-kosullari" element={<RentalTerms />} />

            {/* 404 yok - opsiyonel */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
