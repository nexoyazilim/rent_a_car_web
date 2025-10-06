import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Loading from './components/Loading';
// Not: App artık sadece layout/iskelet; yönlendirme main.jsx'te

function App({ children }) {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setIsBooting(false), 150);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {isBooting ? <Loading /> : children}
      </main>
      <Footer />
    </div>
  );
}

export default App;
