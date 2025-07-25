import React, { useRef, useState, useEffect } from 'react';
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

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(filteredData[0]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const [timeLeft, setTimeLeft] = useState(60);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    if (!lock) {
                        option_array[question.ans - 1].current.classList.add("Correct");
                    }

                    setTimeout(() => {
                        next(true);
                    }, 1000);

                    return 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [index, lock]);


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


    const handleAutoNext = () => {
        if (!lock) {
            option_array[question.ans - 1].current.classList.add("Correct");
        }
        setLock(true);
        setTimeout(() => {
            next();
        }, 1000);
    };


    const next = (force = false) => {
        if (lock || force) {
            if (index === filteredData.length - 1) {
                setResult(true);
                return;
            }
            setIndex(index + 1);
            setQuestion(filteredData[index + 1]);
            setLock(false);
            setTimeLeft(60);
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
        setTimeLeft(60);
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
                        <div className="timer">⏳ Time Left: {timeLeft}s</div>
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
