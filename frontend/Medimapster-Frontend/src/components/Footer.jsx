import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center text-gray-500 dark:text-gray-400 text-sm py-8 bg-white dark:bg-gray-900 mt-10"
    >
      © 2025 MediMapster. All rights reserved.
    </motion.footer>
  );
};

export default Footer;
