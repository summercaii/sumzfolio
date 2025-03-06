import React from 'react';
import './styles/current.css';

function CurrentProjects() {
  return (
    <section id="current-projects">
      <h2>Some Stuff I've Been Working On...</h2>
      <p></p>
      <ul>
        <div className="project-item">
          <strong>Caltrans Traffic Detection System</strong>
          <p>
            Currently, my colleagues and I are working on a real-time traffic analytics system 
            that uses computer vision and machine learning to automate vehicle detection, classification, 
            and traffic flow analysis for the Caltrans team. Some of our key contributions & focus areas:
          </p>
          <p></p>
          <ul className="sub-list">
            <li><strong>Enhanced object detection accuracy:</strong> fine-tuned a YOLOv11-based model to to 98% detection precision</li>
            <li><strong>Developed a web dashboard:</strong> created an interface that visualizes traffic analytics, including vehicle counts, classifications,
             and congestion patterns at key intersections</li>
            <li><strong>Scalability:</strong> exploring cloud-based solutions for deploying models at scale and integrating additional statistical 
            features for more granular insights</li>
          </ul>
          <p>
            Looks something like this right now...
          </p>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src="/caltrans.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
        </div>

      </ul>
    </section>
  );
}

export default CurrentProjects;
