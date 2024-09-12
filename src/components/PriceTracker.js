// src/components/PriceTracker.js
import React, { useState } from 'react';
import './styles/tracker.css';

function PriceTracker() {
  const [amazonUrl, setAmazonUrl] = useState('');
  const [priceThreshold, setPriceThreshold] = useState('');
  const [percentOff, setPercentOff] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Build request payload
    const payload = {
      amazon_url: amazonUrl,
      price_threshold: priceThreshold || null,
      percent_off: percentOff || null, 
      email: email
    };

    const API_URL = process.env.NODE_ENV === 'production' ? 'https://summer-cai-2d1ea290d5a4.herokuapp.com' : 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/track_price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      const result = await response.json();
      console.log('Response from server:', result);

      if (response.ok) {
        setMessage('Tracking initiated successfully!');
      } else {
        setMessage('Failed to track the product. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while tracking the product.');
    }
  };

  return (
    <div>
      <header>
        <h1>Summer Cai</h1>
        <nav>
          <ul>
            <li><a href="/">Back to Portfolio</a></li>
          </ul>
        </nav>
      </header>

      <section id="price-tracker">
        <h2>Summer's Shopping Assistant</h2>
        <div className="">
          <div className="form-section">
            <form id="price-tracker-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <p className="centered-text">If it's on sale, I'm basically saving money right..? Give me the product link and the percent sale or price (or both), and I'll email you when it happens :D Shop smarter, not harder...</p>
                <label htmlFor="amazon-url">Amazon Product URL:</label>
                <input 
                  type="text" 
                  id="amazon-url" 
                  name="amazon-url" 
                  placeholder="Paste product link here"
                  value={amazonUrl}
                  onChange={(e) => setAmazonUrl(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price-threshold">Price Threshold (optional):</label>
                <input 
                  type="number" 
                  id="price-threshold" 
                  name="price-threshold"
                  placeholder="Set your price threshold"
                  value={priceThreshold}
                  onChange={(e) => setPriceThreshold(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="percent-off">Percent Off (optional):</label>
                <input 
                  type="number" 
                  id="percent-off" 
                  name="percent-off"
                  placeholder="Set % off"
                  value={percentOff}
                  onChange={(e) => setPercentOff(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email to get notified"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Track Price</button>
            </form>

            {message && <p>{message}</p>}
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Amazon Price Tracker</p>
      </footer>
    </div>
  );
}

export default PriceTracker;
