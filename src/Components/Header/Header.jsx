import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="app-header">
      <Link to="/" className="logo">🚀 QuizMaster</Link>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={isOpen ? 'open' : ''}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/domains" onClick={() => setIsOpen(false)}>Quiz</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
      </nav>
    </header>
  );
};

export default Header;
