'use client';
import React from 'react';
import { useMathProblem } from '@/app/context/MathProblemContext';
import ProblemStatCard from './ProblemStatCard';
import { useModalContext } from '@/app/context/useModalContext';
import ResultSummary from '../modalBody/ResultSummary';

const StatCard = () => {
  const { problem, isProblemsCompletelyAnswered } = useMathProblem();

  const { openModal } = useModalContext();

  const handleViewSummary = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const renderedProblem = problem?.map((p) => (
      <ProblemStatCard
        key={p.question_id}
        questionId={p.question_id}
        problemText={p.problem_text}
        difficultyLevel={p.difficulty_level}
        feedback={p.feedback}
        userAnswer={p.userAnswer}
        isCorrect={p.isCorrect}
        problemType={p.problem_type}
        solution={p.solution}
        createdAt={p.createdAt}
      />
    ));
    openModal({
      title: 'Result Summary',
      headerColor: 'bg-blue-600',
      size: 'full',
      children: <ResultSummary renderedProblem={renderedProblem} />,
    });
  };
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-4 dark:bg-gray-800 w-full'>
      <div className='text-md font-bold text-gray-800 dark:text-white text-center'>
        Correct Answers: {problem?.filter((p) => p.isCorrect).length} /{' '}
        {problem?.length}
      </div>
      {isProblemsCompletelyAnswered && (
        <div className='flex justify-center mt-4'>
          <button
            type='button'
            className='bg-blue-600 text-white px-4 py-2 rounded'
            onClick={handleViewSummary}
          >
            View Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default StatCard;
