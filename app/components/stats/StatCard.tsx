'use client';
import React from 'react';
import { useMathProblem } from '@/app/context/MathProblemContext';

const StatCard = () => {
  const { problem } = useMathProblem();
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-800 w-full'>
      <div className='text-md font-bold text-gray-800 dark:text-white text-center'>
        Correct Answers: {problem?.filter((p) => p.isCorrect).length} /{' '}
        {problem?.length}
      </div>
    </div>
  );
};

export default StatCard;
