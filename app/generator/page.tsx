'use client';

import { useMathProblem } from '../context/MathProblemContext';
import FeedbackCard from '../components/FeedbackCard';
import ProblemCard from '../components/problem/ProblemCard';
import DarkModeToggle from '../components/DarkModeToggle';
import ErrorCard from '../components/ErrorCard';
import StatCard from '../components/stats/StatCard';
import ViewHistoryCard from '../components/stats/ViewHistoryCard';
import { useMemo, useEffect, useRef, useState } from 'react';
import ReloadWarning from '../components/RealoadWarning';
import { useModalContext } from '../context/useModalContext';
import BackButton from '../components/BackButton';
import { useSearchParams } from 'next/navigation';

export default function Generator() {
  const searchParams = useSearchParams();
  const count = searchParams.get('count');
  const gradeLevel = searchParams.get('gradeLevel');
  const {
    // generateProblem,
    generateProblemBatch,
    setGradeLevel,
    problem,
    problemHistory,
    isLoading,
    error,
    invalidateCurrentSession,
  } = useMathProblem();
  const { openModal, closeModal } = useModalContext();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  // const renderHistory = useMemo(() => {
  //   if (problemHistory.length === 0) return;

  //   return problemHistory.map((problem) => <ViewHistoryCard {...problem} />);
  // }, [problemHistory]);

  const beforeBack = async (): Promise<void> => {
    return new Promise((resolve) => {
      openModal({
        title: 'Confirm',
        headerColor: 'bg-red-600 dark:bg-red-400',
        children: (
          <div className='flex flex-col gap-2 text-center'>
            Current session will end. Are you sure you want to leave this page?
            <div className='flex justify-center gap-2'>
              <button
                className='bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded'
                onClick={() => {
                  closeModal();
                  resolve(void 0);
                }}
              >
                Cancel
              </button>
              <button
                className='bg-red-600 dark:bg-red-400 px-4 py-2 rounded'
                onClick={() => {
                  invalidateCurrentSession();
                  resolve(void 0);
                  closeModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        ),
        size: 'md',
      });
    });
  };

  // const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (count && gradeLevel) {
      generateProblemBatch(Number(count), Number(gradeLevel));
      setGradeLevel(Number(gradeLevel));
    }
  }, [count, gradeLevel]);

  const nextProblem = () => {
    if (currentProblemIndex < problem?.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
  };

  const prevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
    }
  };

  const renderFeedback = (question_id: string) => {
    if (problemHistory.length === 0) return;
    const feedback = problemHistory.find((p) => p.id === question_id);
    return { isCorrect: feedback.is_correct, feedback: feedback.feedback };
  };

  const currentProblem = problem?.[currentProblemIndex];
  const loading = isLoading.type === 'generate' && isLoading.isLoading;

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800'>
      <DarkModeToggle />
      <ReloadWarning />
      <main className='container mx-auto px-4 py-8 max-w-2xl'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
          Math Problem
        </h1>
        {error && <ErrorCard error={error} />}
        <div className='mb-4 flex justify-end'>
          <BackButton beforeBack={beforeBack} />
        </div>
        {loading ? (
          <div className='text-center py-10 text-gray-600 dark:text-gray-300'>
            Generating problems...
          </div>
        ) : currentProblem ? (
          <>
            <ProblemCard {...currentProblem} />

            {problemHistory.length > 0 && (
              <FeedbackCard {...renderFeedback(currentProblem.question_id)} />
            )}

            <div className='flex justify-between mt-6'>
              <button
                onClick={prevProblem}
                disabled={currentProblemIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentProblemIndex === 0
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                ← Previous
              </button>
              <button
                onClick={nextProblem}
                disabled={currentProblemIndex === problem?.length - 1}
                className={`px-4 py-2 rounded-lg ${
                  currentProblemIndex === problem?.length - 1
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <p className='text-center text-gray-600 dark:text-gray-400'>
            No problems available yet.
          </p>
        )}
      </main>
    </div>
  );
}
