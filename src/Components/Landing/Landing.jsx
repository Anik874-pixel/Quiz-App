import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import Header from '../Header/Header';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Header />
      <div className="landing-content">
        <h1>Welcome to the Quiz App 🚀</h1>
        <p>Test your knowledge with fun and challenging questions!</p>
        <button onClick={() => navigate('/quiz')}>Start Quiz</button>
      </div>
    </div>
  );
};

export default Landing;
