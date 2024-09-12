// src/components/Resume.js
import React from 'react';
import './styles/resume.css';
import resumepng from '../photos/summercai.png';


function Resume() {
  return (
    <section id="resume">
      <h2>Resume</h2>
      <div className="resume">
        <img src={resumepng} alt="Resume Preview" />
      </div>
      <div className="centered" style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/summercai.pdf" download>
          <button>Download Resume</button>
        </a>
      </div>
    </section>
  );
}

export default Resume;
