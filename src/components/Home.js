// src/components/Home.js
import React from 'react';
import About from './About';
import Resume from './Resume';
import Projects from './Projects';
import Contact from './Contact';

function Home() {
  return (
    <div>
      <About />
      <Projects />
      <Resume />
      <Contact />
    </div>
  );
}

export default Home;
