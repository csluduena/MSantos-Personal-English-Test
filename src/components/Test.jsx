import React, { useState } from 'react';
import { questions } from '../data/questions';

const Test = ({ onComplete, userData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    if (newAnswers.length === questions.length) {
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      onComplete(totalScore, newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Pregunta {currentQuestion + 1} de {questions.length}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{question.question}</h2>
        </div>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-4 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;