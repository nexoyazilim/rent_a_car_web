import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';
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
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
