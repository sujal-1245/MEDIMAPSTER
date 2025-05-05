import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, useInView } from 'framer-motion';

function FlyToLocation({ center }) {
  const map = useMap();
  map.flyTo(center, 13, { duration: 2 });
  return null;
}

const MapSection = () => {
  const [city, setCity] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const [loading, setLoading] = useState(false);

  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3209/3209049.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const handleCitySearch = async () => {
    if (!city.trim()) {
      alert('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.length === 0) {
        alert('City not found. Please try again.');
        setLoading(false);
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setMapCenter([lat, lon]);

      const overpassQuery = `
        [out:json];
        node["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
        out body;
      `;

      const pharmacyResponse = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
      });

      const pharmacyData = await pharmacyResponse.json();

      const parsedPharmacies = pharmacyData.elements.map((el) => ({
        name: el.tags.name || 'Pharmacy',
        latitude: el.lat,
        longitude: el.lon,
      }));

      setPharmacies(parsedPharmacies);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
  };

  // Refs & animation control
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-100px' });
  const inputInView = useInView(inputRef, { once: false, margin: '-100px' });

  return (
    <section id="pharmacy-map" className="py-20 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-6">

        {/* Title */}
        <motion.h3
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10"
        >
          Find Pharmacies Near You
        </motion.h3>

        {/* Input & Button */}
        <motion.div
          ref={inputRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inputInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
          className="flex justify-center gap-4 mb-8"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your city..."
            className="flex-1 max-w-md border border-gray-300 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-gray-800 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCitySearch}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Set Location'}
          </motion.button>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="h-[500px] max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg"
        >
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <FlyToLocation center={mapCenter} />
            {pharmacies.map((pharmacy, idx) => (
              <Marker
                key={idx}
                position={[pharmacy.latitude, pharmacy.longitude]}
                icon={customMarkerIcon}
              >
                <Popup>
                  <b>{pharmacy.name}</b>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
