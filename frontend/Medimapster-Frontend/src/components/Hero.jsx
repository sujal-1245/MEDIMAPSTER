import React from "react";
import { motion } from "framer-motion";
import medicineImage from "./animations/medicine-drop-copy-copy-1000x1000.webp"; // Correct path to the image

const Hero = () => {
  return (
    <section className="bg-gradient-to-tr from-purple-100 via-pink-100 to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-black py-24">
      <div className="container mx-auto px-6 text-center flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-left md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight"
          >
            Find Affordable Medicines & Pharmacies Near You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-10"
          >
            Discover low-cost generics, search medicines, and find nearby pharmacies with MediMapster.
          </motion.p>
          <motion.a
            href="#medicine-finder"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-2xl text-lg font-semibold hover:bg-purple-700 transition shadow-lg"
          >
            Start Searching
          </motion.a>
        </div>

        {/* Image in Hero Section */}
        <div className="md:w-1/2 w-full max-w-xl mx-auto">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              src={medicineImage} // Path to the image
              alt="Medicine Illustration"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
