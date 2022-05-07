import React, { useState, useCallback, useRef } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { QuestionsState, Difficulty } from './API';
import './index.css'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;
const App = () => {
  const { width, height } = useWindowSize()

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };


  return (
    <>
      {/* <Confetti
        width={width}
        height={height}
        recycle={false}
      /> */}
      <div className="wrapper my-12">
        <h1 className="lg:text-5xl text-3xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary font-bold">
          Science Quiz App
        </h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button onClick={startTrivia} className="btn btn-wide btn-outline btn-primary my-12 ">
            <span>Start</span>
          </button>
        ) : null}
        <div className="stats-wrapper my-8">
          {!gameOver ? <p className='score'>Score: {score}</p> : null}
          {loading ? <p>Loading Questions...</p> : null}
        </div>
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="btn btn-outline btn-primary my-12 " onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </div>
      
    </>
  );
};

export default App;
