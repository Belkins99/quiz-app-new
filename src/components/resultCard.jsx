import React from "react";

const ResultCard = ({ result }) => {
  return (
    <div className="p-4 border rounded shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-lg mb-2">
        You answered {result.correctAnswers} out of {result.totalQuestions}{" "}
        questions correctly.
      </p>
      <p className="text-lg font-semibold">
        Your score: {result.percentage}%
      </p>
    </div>
  );
};

export default ResultCard;
