import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';
import { useParams, useNavigate } from 'react-router-dom';

const Quiz = () => {
    const { domain } = useParams();
    const navigate = useNavigate();


    const filteredData = data.filter((item) => item.domain === domain);

    if (!filteredData.length) {
        return (
            <div className="quiz-page">
                <div className="container">
                    <h1>No questions found for "{domain}"</h1>
                    <button onClick={() => navigate('/')}>Go Back</button>
                </div>
            </div>
        );
    }

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(filteredData[0]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);


    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("Correct");
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add("Wrong");
                option_array[question.ans - 1].current.classList.add("Correct");
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index === filteredData.length - 1) {
                setResult(true);
                return;
            }
            setIndex(index + 1);
            setQuestion(filteredData[index + 1]);
            setLock(false);
            option_array.forEach((option) => {
                option.current.classList.remove("Correct");
                option.current.classList.remove("Wrong");
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(filteredData[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    };

    return (
        <div className="quiz-page">
            <div className='container'>
                <h1>{domain} Quiz</h1>
                <hr />
                {result ? (
                    <>
                        <h2>You Scored {score} out of {filteredData.length}</h2>
                        <button onClick={reset}>Reset</button>
                    </>
                ) : (
                    <>
                        <h2>{index + 1}. {question.question}</h2>
                        <ul>
                            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                        </ul>
                        <button onClick={next}>Next</button>
                        <div className='index'>{index + 1} of {filteredData.length} Questions</div>
                    </>
                )}

                <button className='back-btn' onClick={() => navigate('/domains')}>Back</button>
            </div>
        </div>
    );
};

export default Quiz;
