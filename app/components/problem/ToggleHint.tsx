'use client';
import { useMathProblem } from '@/app/context/MathProblemContext';
import { memo, useState } from 'react';

const ToggleHint = () => {
  const [showHint, setShowHint] = useState(false);
  const { problem } = useMathProblem();

  return (
    <div className='space-y-2'>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showHint
            ? 'opacity-100 translate-y-0 max-h-20'
            : 'opacity-0 -translate-y-2 max-h-0'
        }`}
      >
        <div className='text-gray-600 dark:text-gray-400 text-sm'>
          hint: {problem?.hint}
        </div>
      </div>
      <div className='flex justify-end'>
        <button
          onClick={() => setShowHint(!showHint)}
          className='text-gray-600 dark:text-gray-400 font-bold rounded-lg transition duration-200 ease-in-out transform hover:scale-105 text-sm'
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>
    </div>
  );
};

export default ToggleHint;
