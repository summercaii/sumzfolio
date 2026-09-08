// src/components/Projects.js
import React from 'react';
import './styles/projects.css';
import recs from '../photos/recs.png';
import strava from '../photos/strava.png';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>

      <div className="project">
        <div className="project-text">
          <h3>Summer's Restaurant Recommender</h3>
          <p>
            Suggests the best places to eat based on your favorite cuisine, price range, and location with real-time
            ratings, reviews, and images.
          </p>
          <Link to="/restaurant-recs" className="try-btn">Try it out!!</Link>
        </div>
        <div className="project-image">
          <img src={recs} alt="Restaurant Recommender" />
        </div>
      </div>

      <div className="project">
        <div className="project-text">
          <h3>Strava Wrapped!!</h3>
          <p>
            For myself and anyone who uses Strava. Running the Austin marathon in February. Wish me luck
          </p>
          <Link to="/strava-wrapped" className="try-btn">Strava Wrapped</Link>
        </div>
        <div className="project-image">
          <img src={strava} alt="Strava Wrapped" />
        </div>
      </div>

      <div className="project caltrans-project">
      <div className="project-text">
        <h3>Senior Capstone: Caltrans Traffic Detection System </h3>
        <p>
          Real-time traffic analytics using computer vision and ML to automate vehicle detection, classification,
          and flow analysis for Caltrans.<br />
          Accuracy: fine-tuned a YOLOv11-based model to ~98% detection precision<br />
          Dashboard: interactive counts, classifications, congestion patterns<br />
      </p>
      </div>
      <div className="project-media">
        <video className="project-video" autoPlay loop muted playsInline>
          <source src="/caltrans.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

      {/* <div className="project">
        <div className="project-text">
          <h3>Summer's Shopping Assistant</h3>
          <p>
            Tracks Amazon prices and emails you when a product hits a target price or discount.
          </p>
          <Link to="/price-tracker" className="try-btn">Try it out!!</Link>
        </div>
        <div className="project-image">
          <img src={amazon} alt="Amazon Price Tracker" />
        </div>
      </div> */}
    </section>
  );
}

export default Projects;
