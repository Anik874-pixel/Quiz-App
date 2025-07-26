import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Quiz from './Components/Quiz/Quiz';
import DomainSelector from './Components/DomainSelector/DomainSelector';
import { useParams } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Header from './Components/Header/Header';
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";



const QuizWrapper = () => {
  const { domain } = useParams();
  return <Quiz domain={domain} />;
};

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/domains" element={<DomainSelector />} />
        <Route path="/quiz/:domain" element={<QuizWrapper />} />
      </Routes>
    </>
  );
};

export default App;
