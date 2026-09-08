// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import './styles/hero.css';

const TAGLINE = "software engineer @ paypal, professional foodie";

function Hero() {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <h1 className="hero-title">summer cai</h1>
      <p className="hero-tagline">
        {displayed}
        <span className="hero-cursor">|</span>
      </p>
    </section>
  );
}

export default Hero;
