'use client';

import { useMathProblem } from '../context/MathProblemContext';
import FeedbackCard from '../components/FeedbackCard';
import ProblemCard from '../components/problem/ProblemCard';
import DarkModeToggle from '../components/DarkModeToggle';
import ErrorCard from '../components/ErrorCard';
import StatCard from '../components/stats/StatCard';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useModalContext } from '../context/useModalContext';
import BackButton from '../components/BackButton';
import { useSearchParams } from 'next/navigation';
import Loading from '../components/Loading';
import { getSession } from '@/lib/sessionStorage';

function GeneratorInner() {
  const searchParams = useSearchParams();
  const count = searchParams.get('count');
  const isResume = searchParams.get('resume') === 'true' || false;
  const gradeLevel = searchParams.get('gradeLevel');
  const {
    setCurrentProblemId,
    generateProblemBatch,
    setProblemSessionConfig,
    problem,
    isLoading,
    error,
    invalidateCurrentSession,
    resumeSavedSession,
  } = useMathProblem();
  const { openModal, closeModal } = useModalContext();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

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

  const hasGeneratedRef = useRef(false);
  useEffect(() => {
    if (isResume) {
      const currentSessionId = sessionStorage.getItem('activeSession');
      if (currentSessionId) {
        getSession(currentSessionId).then((localSession) => {
          if (localSession) {
            resumeSavedSession(localSession);
          }
        });
      }
    }
  }, [isResume, resumeSavedSession]);
  useEffect(() => {
    if (count && gradeLevel && !hasGeneratedRef.current && !isResume) {
      generateProblemBatch(Number(count), Number(gradeLevel));
      setProblemSessionConfig({
        count: Number(count),
        gradeLevel: Number(gradeLevel),
      });
      hasGeneratedRef.current = true;
    }
  }, [
    count,
    gradeLevel,
    generateProblemBatch,
    setProblemSessionConfig,
    isResume,
  ]);

  const nextProblem = () => {
    if (currentProblemIndex < problem?.length - 1) {
      setCurrentProblemId(problem?.[currentProblemIndex + 1].question_id);
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
  };

  const prevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemId(problem?.[currentProblemIndex - 1].question_id);
      setCurrentProblemIndex(currentProblemIndex - 1);
    }
  };

  const renderFeedback = (question_id: string) => {
    if (problem?.length === 0) return;
    const feedback = problem?.find((p) => p.question_id === question_id);
    return { isCorrect: feedback.isCorrect, feedback: feedback.feedback };
  };

  const currentProblem = problem?.[currentProblemIndex];
  const loading = isLoading.type === 'generate' && isLoading.isLoading;

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800'>
      <DarkModeToggle />
      <main className='container mx-auto px-4 py-8 max-w-2xl'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
          Math Problem
        </h1>
        {error && <ErrorCard error={error} />}
        <div className='mb-4 flex justify-end'>
          <BackButton beforeBack={beforeBack} />
        </div>
        <div className='mb-4 flex justify-center w-full'>
          <StatCard />
        </div>
        {loading ? (
          <div className='text-center py-10 text-gray-600 dark:text-gray-300'>
            Generating problems...
          </div>
        ) : currentProblem ? (
          <>
            <ProblemCard {...currentProblem} />

            {currentProblem &&
              currentProblem.isAnswered &&
              currentProblem.feedback && (
                <FeedbackCard {...renderFeedback(currentProblem.question_id)} />
              )}

            <div className='w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-600 dark:bg-blue-400'
                style={{
                  width: `${
                    (problem?.filter((p) => p.isAnswered).length /
                      problem?.length) *
                    100
                  }%`,
                }}
              />
            </div>

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
              <div className='text-center text-gray-600 dark:text-gray-300 mb-4'>
                {currentProblemIndex + 1}/{problem?.length}
              </div>
              <button
                onClick={nextProblem}
                disabled={
                  currentProblemIndex === problem?.length - 1 ||
                  !currentProblem.isAnswered
                }
                className={`px-4 py-2 rounded-lg ${
                  currentProblemIndex === problem?.length - 1
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:text-gray-600 disabled:opacity-50 disabled:hover:text-gray-600 disabled:bg-gray-300`}
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

export default function Generator() {
  return (
    <Suspense fallback={<Loading message='Loading problem generator...' />}>
      <GeneratorInner />
    </Suspense>
  );
}
