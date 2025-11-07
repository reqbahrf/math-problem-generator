'use client';
import { ProblemSession } from '@/lib/@types/problemTypes';
import React, { memo } from 'react';

const ProblemStatCard: React.FC<ProblemSession> = ({
  questionId,
  problemText,
  userAnswer,
  isCorrect,
  problemType,
  solution,
  answeredAt,
}) => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 grid grid-cols-[2fr_2fr] gap-4'>
      <div className='md:col-span-1 col-span-2'>
        <h2 className='text-xl text-gray-700 dark:text-gray-300 font-bold mb-2 border-b pb-1'>
          Problem ID: {questionId.slice(0, 8)}...
        </h2>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>{problemText}</p>
      </div>

      <div className='md:col-span-1 col-span-2'>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Your Answer:{' '}
          <span className='font-semibold'>{userAnswer || 'not answered'}</span>
        </p>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Status:{' '}
          <span
            className={`text-white px-2 py-1 rounded-2xl ${
              isCorrect === null
                ? 'bg-gray-600'
                : isCorrect
                ? 'bg-green-600'
                : 'bg-red-600'
            }`}
          >
            {isCorrect === null
              ? 'unanswered'
              : isCorrect
              ? 'Correct'
              : 'Incorrect'}
          </span>
        </p>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Type: {problemType}
        </p>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Answered At: {answeredAt}
        </p>
      </div>
      <hr className='col-span-2' />

      <div className='col-span-2'>
        <h3 className='text-lg font-bold mb-2'>Solution:</h3>
        <p
          className=' text-gray-700 text-sm dark:text-gray-300'
          dangerouslySetInnerHTML={{ __html: solution || 'not available' }}
        />
      </div>
    </div>
  );
};

export default memo(ProblemStatCard);
