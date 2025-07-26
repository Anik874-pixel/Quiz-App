import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="hero">
        <h1 className="main-heading">🚀 Ignite Your Mind</h1>
        <p className="sub-heading">Challenge yourself. Discover your strengths. Level up with every quiz.</p>
        <p className="quote">"The mind is not a vessel to be filled, but a fire to be kindled." 🔥</p>
        <div className="cta-buttons">
          <button onClick={() => navigate('/Login')} className="start-btn">Let's Begin</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
