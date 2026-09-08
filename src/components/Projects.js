// src/components/Projects.js
import React from 'react';
import './styles/projects.css';
import wefitHome from '../photos/wefit/home.jpg';
import wefitFeed1 from '../photos/wefit/feed1.jpg';
import wefitFeed4 from '../photos/wefit/feed4.jpg';
import wefitChallenges from '../photos/wefit/challenges.jpg';

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>

      <div className="project stacked-project">
        <div className="project-text">
          <h3>WeFit</h3>
          <p>
            Built with a team of 2, WeFit is a social fitness app: log workouts across
            3 activity types (running, weightlifting, and basketball), earn points and streaks, join group
            challenges with friends, and share progress in a social feed with likes and comments — all backed by
            Supabase (Auth, Postgres, and Storage for photo/video posts) in a native Swift/SwiftUI app. Also
            integrates Strava via OAuth to auto-import runs, and parses weight-training sessions logged through
            Hevy (which syncs to Strava) into full exercise/set/rep/weight detail.
          </p>
          <a
            href="https://github.com/summercaii/WeFit"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Github Link
          </a>
        </div>
        <div className="project-gallery">
          <img src={wefitHome} alt="WeFit home screen with stats and recent activities" />
          <img src={wefitFeed1} alt="WeFit social feed with a workout video post" />
          <img src={wefitFeed4} alt="WeFit social feed post" />
          <img src={wefitChallenges} alt="WeFit group challenges screen" />
        </div>
      </div>

      <div className="project stacked-project">
      <div className="project-text">
        <h3>Caltrans Traffic Detection System</h3>
        <p>
          Partnered with Caltrans to build a real-time traffic monitoring system that automates vehicle detection,
          classification, and flow analysis from live camera feeds using computer vision and machine learning.
          Fine-tuned a YOLOv11-based model to ~98% detection precision, with multi-threaded buffering and cloud
          GPU acceleration for real-time processing at scale, and built an interactive dashboard visualizing
          vehicle counts, classifications, and congestion patterns for transportation analysis.
        </p>
      </div>
      <div className="project-media">
        <video className="project-video" autoPlay loop muted playsInline>
          <source src="/caltrans.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    </section>
  );
}

export default Projects;
