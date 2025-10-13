'use client';
import { ProblemHistory } from '@/app/types/problemTypes';
import React, { memo } from 'react';

const ViewHistoryCard = ({
  id,
  problem_text,
  user_answer,
  is_correct,
  solution,
  created_at,
}: ProblemHistory) => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 grid grid-cols-[2fr_2fr] gap-4'>
      <div className='md:col-span-1 col-span-2'>
        <h2 className='text-xl text-gray-700 dark:text-gray-300 font-bold mb-2 border-b pb-1'>
          Problem ID: {id.slice(0, 8)}...
        </h2>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>{problem_text}</p>
      </div>

      <div className='md:col-span-1 col-span-2'>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Your Answer: <span className='font-semibold'>{user_answer}</span>
        </p>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Status:{' '}
          <span
            className={`text-white px-2 py-1 rounded-2xl ${
              is_correct ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {is_correct ? 'Correct' : 'Incorrect'}
          </span>
        </p>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Created: {created_at}
        </p>
      </div>
      <hr className='col-span-2' />

      <div className='col-span-2'>
        <h3 className='text-lg font-bold mb-2'>Solution:</h3>
        <p
          className=' text-gray-700 text-sm dark:text-gray-300'
          dangerouslySetInnerHTML={{ __html: solution }}
        />
      </div>
    </div>
  );
};

export default memo(ViewHistoryCard);
