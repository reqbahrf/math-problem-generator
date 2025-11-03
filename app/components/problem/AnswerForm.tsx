'use client';
import { useMathProblem } from '@/app/context/MathProblemContext';
import ToggleHint from './ToggleHint';
import { memo, useMemo } from 'react';

const AnswerForm = () => {
  const {
    submitAnswer,
    isLoading,
    currentProblemId,
    problemSessionConfig,
    problem,
    setProblem,
  } = useMathProblem();

  const currentProblem = useMemo(() => {
    return problem?.find((p) => p.question_id === currentProblemId);
  }, [problem, currentProblemId]);

  const handleSetUserAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProblem((prev) => {
      return prev.map((p) => {
        if (p.question_id === currentProblemId) {
          return {
            ...p,
            userAnswer: e.target.value,
          };
        }
        return p;
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitAnswer(
      currentProblem?.userAnswer,
      currentProblemId,
      problemSessionConfig.gradeLevel
    );
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
            key={currentProblemId}
            type='number'
            id='answer'
            disabled={
              problem?.find((p) => p.question_id === currentProblemId)
                ?.isAnswered
            }
            value={currentProblem?.userAnswer}
            onChange={(e) => handleSetUserAnswer(e)}
            className='w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-gray-600 dark:focus:ring-blue-600 dark:bg-gray-800'
            placeholder='Enter your answer'
            required
          />
        </div>

        {!currentProblem?.isAnswered && (
          <>
            <button
              type='submit'
              disabled={
                !currentProblem?.userAnswer ||
                (isLoading.type === 'submit-answer' && isLoading.isLoading) ||
                problem?.find((p) => p.question_id === currentProblemId)
                  ?.isAnswered
              }
              className='w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:scale-100 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'
            >
              {isLoading.type === 'submit-answer' && isLoading.isLoading
                ? 'Submitting...'
                : 'Submit Answer'}
            </button>
            <ToggleHint />
          </>
        )}
      </form>
    </>
  );
};

export default AnswerForm;
