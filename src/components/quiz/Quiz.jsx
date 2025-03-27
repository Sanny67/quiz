import React, { useState } from 'react';
import { data } from '../../assets/data';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false); // New state

  const handleAnswerClick = (answerIndex) => {
    if (!answered) {
      setSelectedAnswer(answerIndex);
      setAnswered(true);
      setShowAnswerFeedback(true); // Show feedback after selection
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer + 1 === data[currentQuestion].ans) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      setAnswered(false);
      setShowAnswerFeedback(false); // Hide feedback on next question
      if (currentQuestion + 1 < data.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }
  };

  const getAnswerButtonClass = (answerIndex) => {
    if (selectedAnswer === null) {
      return 'w-full py-2 px-4 border rounded hover:bg-gray-100 text-left';
    } else {
      if (answerIndex + 1 === data[currentQuestion].ans) {
        return 'w-full py-2 px-4 border rounded bg-green-100 text-left';
      } else if (selectedAnswer === answerIndex) {
        return 'w-full py-2 px-4 border rounded bg-red-100 text-left';
      } else {
        return 'w-full py-2 px-4 border rounded hover:bg-gray-100 text-left';
      }
    }
  };

  if (showScore) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Quiz Completed!</h2>
          <p className="text-lg text-center">Your Score: {score} out of {data.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quiz App</h2>

        <div className="mb-6">
          <p className="text-lg mb-2">
            {currentQuestion + 1}. {data[currentQuestion].question}
          </p>

          <div className="space-y-2">
            <button
              className={getAnswerButtonClass(0)}
              onClick={() => handleAnswerClick(0)}
              disabled={answered}
            >
              {data[currentQuestion].option1}
            </button>
            <button
              className={getAnswerButtonClass(1)}
              onClick={() => handleAnswerClick(1)}
              disabled={answered}
            >
              {data[currentQuestion].option2}
            </button>
            <button
              className={getAnswerButtonClass(2)}
              onClick={() => handleAnswerClick(2)}
              disabled={answered}
            >
              {data[currentQuestion].option3}
            </button>
            <button
              className={getAnswerButtonClass(3)}
              onClick={() => handleAnswerClick(3)}
              disabled={answered}
            >
              {data[currentQuestion].option4}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextQuestion}
          >
            {currentQuestion + 1 === data.length ? 'Finish' : 'Next'}
          </button>
          {showAnswerFeedback && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Your Answer: {selectedAnswer + 1}<br />
              Correct Answer: {data[currentQuestion].ans}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          {currentQuestion + 1} of {data.length} questions
        </p>
      </div>
    </div>
  );
};

export default Quiz;