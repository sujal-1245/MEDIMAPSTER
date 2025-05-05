import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const MedicineFinder = () => {
  const [medicine, setMedicine] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!medicine.trim()) {
      alert('Please enter a medicine name.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/search-medicine', {
        medicine_name: medicine
      });

      if (response.data.recommended_medicines && response.data.recommended_medicines.length > 0) {
        setResults(response.data.recommended_medicines);
      } else {
        setResults([]);
        alert('No medicines found matching the query.');
      }
    } catch (error) {
      console.error('Error searching for medicines:', error);
      alert('Something went wrong. Please try again later.');
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="medicine-finder" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        {/* Hero Title */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-10"
        >
          Find Generic Medicine Alternatives
        </motion.h3>

        {/* Search Input and Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="flex justify-center gap-4 max-w-xl mx-auto mb-12"
        >
          <motion.input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter medicine name or symptom..."
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-gray-800 dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            viewport={{ once: false }}
          />
          <motion.button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </motion.button>
        </motion.div>

        {/* Loading Text */}
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="text-gray-500 dark:text-gray-400"
          >
            Loading...
          </motion.p>
        )}

        {/* Results Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-center">
          {results.length > 0 ? (
            results.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: false }}
                className={`rounded-2xl p-6 shadow-lg ${
                  index === 0
                    ? 'bg-purple-100 dark:bg-purple-900'
                    : 'bg-green-100 dark:bg-green-900'
                }`}
              >
                <motion.h4
                  className="text-xl font-bold mb-1 text-gray-800 dark:text-white"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  viewport={{ once: false }}
                >
                  {item.name}
                </motion.h4>
                <motion.p
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  {index === 0 ? 'Branded Medicine' : 'Generic Alternative'}
                </motion.p>
                <motion.p
                  className="text-gray-900 dark:text-gray-100 font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: false }}
                >
                  Price: ₹{item["price(₹)"]}
                </motion.p>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="text-gray-500 dark:text-gray-400"
            >
              No medicines found.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MedicineFinder;
