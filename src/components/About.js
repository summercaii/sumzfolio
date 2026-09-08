// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import sumz from '../photos/sumz2.png';
import './styles/about.css';

function About() {
  return (
    <section id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Me !!!</h2>
          <p>
          I'm Summer, a Software Engineer at PayPal working on Braintree's payments platform.
          I love turning ideas into reality — whether it's building production microservices,
          shipping AI-powered tooling, or exploring new side projects. When I'm not coding,
          you can find me <Link to="/coffee-shops">at a coffee shop</Link>,
          <Link to="/restaurant-recs"> trying new restaurants</Link>, at the gym or in the kitchen.
          Always open to new ideas and challenges — let's connect!
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
