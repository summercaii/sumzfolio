import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/restaurant.css';

function RestaurantRecs() {
  const [restaurant, setRestaurant] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setResults([]);

    try {
      const API_URL = process.env.NODE_ENV === 'production' ? 'https://summer-cai-2d1ea290d5a4.herokuapp.com' : 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/recommendations?restaurant=${encodeURIComponent(restaurant)}&location=${encodeURIComponent(location)}`);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setResults(data);
        } else {
          setError('No recommendations found. Please try again.');
        }
      } else {
        setError('No recommendations found. Please try again.');
      }
    } catch (err) {
      setError('Error fetching recommendations. Please try again later.');
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

      <section id="restaurant-recommender">
        <h2>Summer's Restaurant Recs !!!</h2>
        <form id="restaurant-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <p className="centered-text">
              Tell me your favorite restaurant, and I'll try to give you recs based on similar cuisine, price range, & location :D
            </p>
            <p className="centered-texts"> <Link to="/map"> Link to my favorite restaurants</Link> </p>
            <label htmlFor="restaurant">Restaurant:</label>
            <input 
              type="text" 
              id="restaurant" 
              name="restaurant" 
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required 
            />
          </div>

          <button type="submit">Get Recs!</button>
        </form>

        {error && <p className="error">{error}</p>}

        {results.length > 0 && (
          <div id="results">
            <h3>Recommendations:</h3>
            {results.map((result, index) => (
              <div className="restaurant-item" key={index}>
                <div className="restaurant-info">
                  <h3>{index + 1}. <a href={result.url} target="_blank" rel="noopener noreferrer">{result.name}</a></h3>
                  <p><strong>Rating:</strong> {result.rating} stars (based on {result.review_count} reviews)</p>
                  <p><strong>Phone:</strong> {result.phone || 'N/A'}</p>
                  <p><strong>Price:</strong> {result.price_range || 'N/A'}</p>
                  <p><strong>Location:</strong> {result.location}</p>
                </div>

                {/* Photo Gallery */}
                {result.images && result.images.length > 0 && (
                  <div className="photo-gallery">
                    {result.images.slice(0, 5).map((image, i) => (
                      <div className="gallery-item" key={i}>
                        <img src={image} alt={`${result.name} ${i}`} className="gallery-img" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2024 Restaurant Recommender</p>
      </footer>
    </div>
  );
}

export default RestaurantRecs;
