'use client';
import { FeedbackProps } from '@/app/types/feedbackTypes';
import { memo } from 'react';

const FeedbackCard = ({ isCorrect, feedback }: FeedbackProps) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 ${
        isCorrect
          ? 'bg-green-50 border-2 border-green-200'
          : 'bg-yellow-50 border-2 border-yellow-200'
      }`}
    >
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        {isCorrect ? '✅ Correct!' : '❌ Not quite right'}
      </h2>
      <p className='text-gray-800 leading-relaxed'>{feedback}</p>
    </div>
  );
};

export default memo(FeedbackCard);
