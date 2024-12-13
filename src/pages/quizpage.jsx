import React, { useState } from "react";
import { questions } from "../data/questions.js";
import QuestionCard from "../components/questionCard";
import ResultCard from "../components/resultCard.jsx";
import ProgressBar from "../components/progressBar";

const Quiz = () => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    userAnswers: [],
    isCompleted: false,
    result: null,
  });

  // Handle answer selection
  const handleAnswerSelect = (selectedIndex) => {
    const updatedAnswers = [...quizState.userAnswers];
    updatedAnswers[quizState.currentQuestionIndex] = selectedIndex;
    setQuizState((prev) => ({
      ...prev,
      userAnswers: updatedAnswers,
    }));
  };

  // Handle moving to the next question
  const handleNext = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  // Handle moving to the previous question
  const handlePrevious = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  };

  // Handle finishing the quiz
  const handleFinish = () => {
    const correctAnswers = quizState.userAnswers.reduce(
      (sum, answer, index) =>
        sum + (answer === questions[index].correctAnswer ? 1 : 0),
      0
    );

    const result = {
      totalQuestions: questions.length,
      correctAnswers,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    };

    setQuizState({
      ...quizState,
      isCompleted: true,
      result,
    });
  };

  // Reset the quiz
  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      userAnswers: [],
      isCompleted: false,
      result: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className=" mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Brain Switch
          </h1>
          <p className="text-gray-600 font-bold text-2xl ">Are You Smart?</p>
        </div>

        {/* Quiz Content */}
        {!quizState.isCompleted ? (
          <div className="flex flex-col items-center">
            {/* Progress Bar */}
            <ProgressBar
              current={quizState.currentQuestionIndex}
              total={questions.length}
            />

            {/* Question Card */}
            <QuestionCard
              question={questions[quizState.currentQuestionIndex]}
              currentQuestionIndex={quizState.currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={quizState.userAnswers[quizState.currentQuestionIndex] ?? null}
              handleAnswerSelect={handleAnswerSelect}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-2xl mt-4">
              <button
                onClick={handlePrevious}
                disabled={quizState.currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold
                  disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {quizState.currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleFinish}
                  disabled={quizState.userAnswers[quizState.currentQuestionIndex] === undefined}
                  className="px-4 py-2 bg-rose-950 text-white rounded-lg font-semibold
                    disabled:bg-rose-800 disabled:cursor-not-allowed"
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={quizState.userAnswers[quizState.currentQuestionIndex] === undefined}
                  className="px-4 py-2 bg-rose-950 text-white rounded-lg font-semibold
                    disabled:bg-rose-800 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <ResultCard result={quizState.result} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
