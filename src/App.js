// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CoffeeShops from './components/CoffeeShops';
import RestaurantRecs from './components/RestaurantRecs';
import PriceTracker from './components/PriceTracker';
import Map from './components/Map';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/sumzfolio" element={<Home />} /> 
        <Route path="/coffee-shops" element={<CoffeeShops />} />
        <Route path="/restaurant-recs" element={<RestaurantRecs />} />
        <Route path="/price-tracker" element={<PriceTracker />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
