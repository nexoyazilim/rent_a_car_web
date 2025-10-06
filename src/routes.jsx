import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import RentalTerms from './pages/RentalTerms';

export const AppRoutes = () => (
  <Routes>
    {/* EN slugs */}
    <Route path="/" element={<Home />} />
    <Route path="/vehicles" element={<Vehicles />} />
    <Route path="/vehicle/:id" element={<VehicleDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/rental-terms" element={<RentalTerms />} />
    {/* TR slugs */}
    <Route path="/araclar" element={<Vehicles />} />
    <Route path="/arac/:id" element={<VehicleDetail />} />
    <Route path="/hakkimizda" element={<About />} />
    <Route path="/iletisim" element={<Contact />} />
    <Route path="/kiralama-kosullari" element={<RentalTerms />} />
  </Routes>
);

export default AppRoutes;


