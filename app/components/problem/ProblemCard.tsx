'use client';
import AnswerForm from '@/app/components/problem/AnswerForm';
import { memo } from 'react';

const ProblemCard = ({ problemText }: { problemText: string }) => {
  return (
    <>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700 dark:text-white'>
          Problem:
        </h2>
        <p className='text-lg text-gray-800 dark:text-white leading-relaxed mb-6'>
          {problemText}
        </p>
        <AnswerForm />
      </div>
    </>
  );
};

export default memo(ProblemCard);
