import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">🚀 QuizMaster</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Quiz</a>
        <a href="#">About</a>
      </nav>
    </header>
  );
};

export default Header;
