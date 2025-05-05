import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicineFinder from './components/MedicineFinder';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/hero"
          element={
            <div className="font-sans min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <Hero />
              <MedicineFinder />
              <MapSection />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
