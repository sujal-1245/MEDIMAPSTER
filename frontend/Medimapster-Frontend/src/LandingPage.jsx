import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 min-h-screen">

      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md p-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          MediMapster
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">
            Home
          </button>
          <button onClick={() => window.scrollTo({ top: document.getElementById('about').offsetTop, behavior: 'smooth' })} className="hover:underline">
            About
          </button>
          <button onClick={() => window.scrollTo({ top: document.getElementById('contact').offsetTop, behavior: 'smooth' })} className="hover:underline">
            Contact
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="ml-4 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20}/> : <Moon size={20}/> }
          </button>
        </div>
      </nav>

      {/* Mobile Theme Toggle */}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-3 rounded-full bg-gray-300 dark:bg-gray-700"
        >
          {darkMode ? <Sun size={24}/> : <Moon size={24}/> }
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Welcome to MediMapster
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-2xl max-w-2xl mb-8"
        >
          Find affordable generic medicines and nearby pharmacies — with ease and trust.
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/hero')}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl text-lg font-semibold shadow-md"
        >
          Explore Now
        </motion.button>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex justify-center items-center px-6 py-16 bg-gray-100 dark:bg-gray-800">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-8 max-w-6xl w-full"
        >
          {/* Text Section */}
          <div className="flex-1 text-left">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
              className="text-4xl font-bold mb-6"
            >
              About MediMapster
            </motion.h2>
            <motion.p 
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg mb-4"
            >
              MediMapster is your ultimate guide to affordable healthcare. Search for medicines, find cost-effective generic alternatives, and locate nearby pharmacies instantly.
            </motion.p>
            <motion.p 
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg"
            >
              Our platform ensures transparency, trust, and accessibility — because quality healthcare should be within everyone's reach.
            </motion.p>
          </div>

          {/* Image Section */}
          <motion.div 
            whileInView={{ scale: 1.1 }}
            initial={{ scale: 0.9 }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <motion.img
              src="https://images.pexels.com/photos/3652103/pexels-photo-3652103.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Image 1"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* New Section with Image Carousel */}
      <section className="relative min-h-screen flex justify-center items-center px-4 py-16 bg-gray-100 dark:bg-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center space-x-8 max-w-6xl w-full"
        >
          {/* Image Section */}
          <motion.div 
            whileInView={{ scale: 1.1 }}
            initial={{ scale: 0.9 }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <motion.img
              src="https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Image 2"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div 
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 text-left"
          >
            <motion.p className="text-xl text-left max-w-3xl mb-8">
              Explore how MediMapster connects you to affordable healthcare solutions through an easy-to-use interface and seamless service.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl w-full bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-lg backdrop-blur-md"
        >
          <motion.h2 className="text-4xl font-bold mb-6 text-center">
            Contact Us
          </motion.h2>
          <form className="flex flex-col gap-4">
            <motion.input 
              type="text" 
              placeholder="Your Name" 
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            />
            <motion.input 
              type="email" 
              placeholder="Your Email" 
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            />
            <motion.textarea 
              placeholder="Your Message" 
              rows="4" 
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl text-lg font-semibold mt-4"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;
