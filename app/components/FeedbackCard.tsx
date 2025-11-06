'use client';
import { FeedbackProps } from '@/lib/@types/feedbackTypes';
import { memo } from 'react';

const FeedbackCard = ({ isCorrect, feedback }: FeedbackProps) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 ${
        isCorrect
          ? 'bg-green-50 border-2 border-green-200 dark:bg-green-800 dark:border-green-600'
          : 'bg-yellow-50 border-2 border-yellow-200 dark:bg-yellow-800 dark:border-yellow-600'
      } mb-4`}
    >
      <h2 className='text-xl font-semibold mb-4 text-gray-700 dark:text-white'>
        {isCorrect ? '✅ Correct!' : '❌ Not quite right'}
      </h2>
      <p
        className='text-gray-800 dark:text-white leading-relaxed'
        dangerouslySetInnerHTML={{ __html: feedback }}
      />
    </div>
  );
};

export default memo(FeedbackCard);
