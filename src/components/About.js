// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import sumz from '../photos/sumz.png';
import './styles/about.css';

function About() {
  return (
    <section id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Me !!!</h2>
          <p>
            I'm a senior at California Polytechnic State University at San Luis Obispo, pursuing a B.S. degree in Computer Engineering.
            With a strong passion for building innovative solutions, I'm excited to apply my technical skills to create software that 
            makes a real impact. When I'm not coding, you might find me:
          </p>
          <ol style={{ listStyleType: 'decimal' }}>
            <li><Link to="/coffee-shops">At a coffee shop</Link></li>
            <li><Link to="/restaurant-recs">Trying new restaurants</Link></li>
            <li><Link to="/price-tracker">Online shopping</Link></li>
          </ol>
        </div>
        <div className="about-image">
          <img src={sumz} alt="Summer Cai" />
        </div>
      </div>
    </section>
  );
}

export default About;
