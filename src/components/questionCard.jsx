import React from "react";

const QuestionCard = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  handleAnswerSelect,
}) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-2">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>
      <p className="mb-4 text-[20px]" >{question.text}</p>
      <div className="space-y-2 text-[20px]">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`block w-full p-4 border rounded ${
              selectedAnswer === index
                ? "bg-pink-900 text-white hover:bg-rose-900"
                : "bg-gray-200" 
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
