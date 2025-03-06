// src/components/Home.js
import React from 'react';
import About from './About';
import Resume from './Resume';
import Projects from './Projects';
import Current from './Current';
import Contact from './Contact';

function Home() {
  return (
    <div>
      <About />
      <Current />
      <Resume />
      <Projects />
      <Contact />
    </div>
  );
}

export default Home;
