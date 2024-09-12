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
            I'm a senior at California Polytechnic State University at San Luis Obispo, pursuing a BS degree in Computer Engineering.
            I'm passionate about software development and excited to apply my skills in technology to solve complex problems and
            create meaningful solutions. When I'm not coding, you’ll find me <Link to="/coffee-shops">at a coffee shop</Link>, 
            <Link to="/restaurant-recs"> trying new restaurants</Link>, or <Link to="/price-tracker">shopping</Link>.
          </p>
        </div>
        <div className="about-image">
          <img src={sumz} alt="Summer Cai" />
        </div>
      </div>
    </section>
  );
}

export default About;
