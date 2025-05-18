import React from 'react';
import './HeroSection.css';

const HeroSection = () => (
  <section
    className="hero"
    
  >
 
    <div className="hero-left">
      <h1>Start learning & define your future</h1>
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
      <ul>
        <li>✅ Skilled and experienced coaches</li>
        <li>✅ Supportive 1:1 coaching</li>
      </ul>
      <div className="hero-buttons">
        <button className="get-started">Get Started</button>
        <button className="learn-more">Learn More</button>
      </div>
    </div>
    <div className="hero-right">
      <img src="/home1.jpg" alt="Student" />
    </div>
  </section>
);

export default HeroSection;
