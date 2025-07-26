import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../../utils/auth';
import { domains } from '../../Data/domains';
import './DomainSelector.css';

const DomainSelector = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        await axios.get('http://localhost:8000/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const startQuiz = () => {
    if (selectedDomain) {
      navigate(`/quiz/${selectedDomain}`);
    }
  };

  return (
    <div className="domain-page">
      <div className="domain-page-inner">
        <h1 className="domain-title">🧠 Select a Domain to Start Quiz</h1>

        <div className="domain-cards-wrapper">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className={`domain-card ${selectedDomain === domain.id ? 'selected' : ''}`}
              onClick={() => setSelectedDomain(domain.id)}
            >
              <h2>{domain.name}</h2>
            </div>
          ))}
        </div>

        <button
          className="start-quiz-button"
          onClick={startQuiz}
          disabled={!selectedDomain}
        >
          Start Quiz
        </button>

        <button className="back-btn" onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
};

export default DomainSelector;
