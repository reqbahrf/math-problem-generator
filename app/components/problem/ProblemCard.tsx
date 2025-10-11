'use client';
import AnswerForm from '@/app/components/problem/AnswerForm';
import { memo } from 'react';
import { MathProblem } from '@/app/types/problemTypes';

const ProblemCard = (props: MathProblem) => {
  return (
    <>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700 dark:text-white'>
          Problem:
        </h2>
        <div className='flex gap-2 mb-4'>
          <span className='text-sm bg-blue-500 font-semibold mb-2 text-gray-700 dark:text-white rounded-full px-2 py-1'>
            Type: {props.problem_type}
          </span>
          <span
            className={`text-sm font-semibold mb-2 rounded-full px-2 py-1 ${
              {
                Easy: 'bg-green-200 text-green-800',
                Medium: 'bg-yellow-200 text-yellow-800',
                Hard: 'bg-red-200 text-red-800',
              }[props.difficulty_level] || 'bg-gray-200 text-gray-800'
            }`}
          >
            Level: {props.difficulty_level}
          </span>
        </div>
        <p className='text-lg text-gray-800 dark:text-white leading-relaxed mb-6'>
          {props.problem_text}
        </p>
        <AnswerForm />
      </div>
    </>
  );
};

export default memo(ProblemCard);
