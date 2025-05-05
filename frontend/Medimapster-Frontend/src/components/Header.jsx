import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-50 transition">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-purple-700 dark:text-purple-300 tracking-wide">
          MediMapster
        </h1>

        {/* Search Button with Beyblade-style Spin */}
        <motion.button
          onClick={() => window.location.href = '#medicine-finder'} // Redirect to Search Medicine section
          className="w-14 h-14 rounded-full bg-purple-600 dark:bg-purple-400 text-white dark:text-gray-800 flex items-center justify-center transition hover:scale-110"
          title="Search Medicine"
          whileHover={{
            rotate: 360, // Full rotation on hover
            transition: { duration: 0.8, ease: "easeOut" } // Smooth spin
          }}
          whileTap={{
            scale: 0.95 // Slightly reduce the size on tap
          }}
        >
          <span className="text-3xl font-bold">
            🔍
          </span>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
