import React, { useState } from 'react'
import Questionlist from './Questionlist'
import QuizCSS from './Quiz.css'

export default function Quiz() {
    const questions = [
        {
            question : "What is React?",
            options : ['React Library', 'JS Framework', 'Testing Tool', 'React Framework'],
            answer : "React Library"
        },

        {
            question : "Genetic DNA of Indominus Rex?",
            options : ['Raptor and Spino', 'Mossosauras and T-rex', 'T-rex and Raptor', 'Spino and T-rex'],
            answer : "T-rex and Raptor"
        }
    ]
    const [currentQuestionIndex, setCurrentQuetsionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const handleClick = (option) => {
        setCurrentAnswer(option)
        if(option === questions[currentQuestionIndex].answer){
            setScore(score+1)
        }
    }
    const handleNextQuestion = ()=>{
        setCurrentQuetsionIndex(currentQuestionIndex + 1);
        setCurrentAnswer(null);
    }
  return (
    <div>
        { currentQuestionIndex < questions.length ? <div>
            <Questionlist question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options} handleClick = 
            {handleClick} currentAnswer={currentAnswer}/>
            <button disabled= {currentAnswer === null} className={currentAnswer === null ? 'button-disable' : 'button'} onClick={handleNextQuestion}>Next</button>
        </div> : <div> Your Score is {score} </div> }
    </div>
  )
}
