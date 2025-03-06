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
            I'm Summer, a senior at California Polytechnic State University, San Luis Obispo,
            majoring in Computer Engineering. I love turning ideas into reality— whether it's 
             crafting full-stack applications or exploring AI-driven solutions. 
            When I'm not coding, you can find me <Link to="/coffee-shops">at a coffee shop</Link>, 
            <Link to="/restaurant-recs"> trying new restaurants</Link>, or <Link to="/price-tracker">shopping</Link>.
            Otherwise, probably on a run, at the gym, or in the kitchen. Always open to new ideas and challenges—let's connect!
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
