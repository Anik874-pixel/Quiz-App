import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domains } from '../../Data/domains';
import './DomainSelector.css';

const DomainSelector = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(null);

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
              className={`domain-card ${selectedDomain === domain.id ? 'selected' : ''
                }`}
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

        <button className='back-btn' onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
};

export default DomainSelector;
