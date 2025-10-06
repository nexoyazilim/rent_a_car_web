import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
// Not: App artık sadece layout/iskelet; yönlendirme main.jsx'te

function App({ children }) {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default App;
