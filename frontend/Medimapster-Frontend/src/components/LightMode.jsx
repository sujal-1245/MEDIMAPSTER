import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicineFinder from './components/MedicineFinder';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

const LightMode = () => {
  return (
    <div className="font-sans bg-white text-black transition-colors duration-500">
      <Header mode="light" />
      <Hero />
      <MedicineFinder />
      <MapSection />
      <Footer />
    </div>
  );
};

export default LightMode;
