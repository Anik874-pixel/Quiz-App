import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to the Quiz App 🚀</h1>
        <p>Test your knowledge with fun and challenging questions!</p>
        <button onClick={() => navigate('/domains')}>Start Quiz</button>
      </div>
    </div>
  );
};

export default Landing;
