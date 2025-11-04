'use client';
import React from 'react';
import { useMathProblem } from '@/app/context/MathProblemContext';

const StatCard = () => {
  const { problem } = useMathProblem();
  const isProblemsCompletelyAnswered = problem?.every((p) => p.isAnswered);
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
          >
            View Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default StatCard;
