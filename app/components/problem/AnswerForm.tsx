'use client';
import { useMathProblem } from '@/app/context/MathProblemContext';
import ToggleHint from './ToggleHint';
import { memo } from 'react';

const AnswerForm = () => {
  const {
    submitAnswer,
    isLoading,
    currentProblemId,
    gradeLevel,
    userAnswer,
    setUserAnswer,
    isCorrect,
  } = useMathProblem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitAnswer(userAnswer, currentProblemId, gradeLevel);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <div>
          <label
            htmlFor='answer'
            className='block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2'
          >
            Your Answer:
          </label>
          <input
            type='number'
            id='answer'
            disabled={isCorrect !== null}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className='w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-gray-600 dark:focus:ring-blue-600 dark:bg-gray-800'
            placeholder='Enter your answer'
            required
          />
        </div>

        <button
          type='submit'
          disabled={
            !userAnswer ||
            (isLoading.type === 'submit-answer' && isLoading.isLoading) ||
            isCorrect !== null
          }
          className='w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:scale-100 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'
        >
          {isLoading.type === 'submit-answer' && isLoading.isLoading
            ? 'Submitting...'
            : 'Submit Answer'}
        </button>
        <ToggleHint />
      </form>
    </>
  );
};

export default AnswerForm;
