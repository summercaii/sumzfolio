import React from 'react';
import './styles/map.css';  // Create a separate CSS file for custom styling

const Map = () => {
  return (
    <div className="map-container">
      <iframe 
        src="https://www.google.com/maps/d/u/0/embed?mid=1lQYIQhwrRYiIY0Yal8GD3bI8i4u2oRU&ehbc=2E312F&q=San+Francisco,CA&zoom=14"
        width="100%" 
        height="100%"  // Adjust height as needed
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy"
        title="Favorite Restaurants Map"
      ></iframe>
    </div>
  );
};

export default Map;
