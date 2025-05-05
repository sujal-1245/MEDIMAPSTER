import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PrescriptionUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpload(file);
    };

    return (
        <motion.div
            className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                    Upload Prescription
                </button>
            </form>
        </motion.div>
    );
};

export default PrescriptionUpload;
