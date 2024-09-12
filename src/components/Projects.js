// src/components/Projects.js
import React from 'react';
import './styles/projects.css';
import recs from '../photos/recs.png'
import amazon from '../photos/amazon.png'
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>

      <div className="project">
        <div className="project-text">
          <h3>Summer's Restaurant Recommender</h3>
          <p>
            Suggests the best places to eat based on similar cuisine, price range, and location.
            Uses Yelp's API to provide real-time data about restaurants, including ratings, reviews, and images.
            Built using Flask for the backend and interacts with external APIs.
          </p>
          <Link to="/restaurant-recs" className="try-btn">Try it out!!</Link>
        </div>
        <div className="project-image">
          <img src={recs} alt="Restaurant Recommender" />
        </div>
      </div>

      <div className="project">
        <div className="project-text">
          <h3>Summer's Shopping Assistant</h3>
          <p>
            Track prices on Amazon products and sends an email alert when the product reaches price
            threshold or percent discount. Built with Python and Flask and makes use of the Amazon API to monitor real-time pricing.
          </p>
          <Link to="/price-tracker" className="try-btn">Try it out!!</Link> 
        </div>
        <div className="project-image">
          <img src={amazon} alt="Amazon Price Tracker" />
        </div>
      </div>
    </section>
  );
}

export default Projects;
