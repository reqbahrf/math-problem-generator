'use client';
import React, { forwardRef } from 'react';
import { useMathProblem } from '@/app/context/MathProblemContext';

const StatCard = forwardRef<HTMLButtonElement, {}>(({}, ref) => {
  const { score, problemHistory, setShowHistory } = useMathProblem();
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-800 flex justify-between items-center'>
      <div className='text-xl font-bold text-gray-800 dark:text-white justify-self-center'>
        Score: {score} / {problemHistory.length}
      </div>
      <button
        ref={ref}
        onClick={() => setShowHistory(true)}
        className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition'
      >
        See History
      </button>
    </div>
  );
});

export default StatCard;
