'use client';

import { useMathProblem } from '../context/MathProblemContext';
import FeedbackCard from '../components/FeedbackCard';
import ProblemCard from '../components/problem/ProblemCard';
import DarkModeToggle from '../components/DarkModeToggle';
import ErrorCard from '../components/ErrorCard';
import StatCard from '../components/stats/StatCard';
import ViewHistoryCard from '../components/stats/ViewHistoryCard';
import { useMemo, useEffect } from 'react';
import ReloadWarning from '../components/RealoadWarning';
import { useModalContext } from '../context/useModalContext';
import BackButton from '../components/BackButton';

export default function Home() {
  const {
    generateProblem,
    problem,
    problemHistory,
    showHistory,
    setShowHistory,
    score,
    isLoading,
    feedback,
    isCorrect,
    error,
  } = useMathProblem();
  const { openModal } = useModalContext();

  const renderHistory = useMemo(() => {
    if (problemHistory.length === 0) return;

    return problemHistory.map((problem) => <ViewHistoryCard {...problem} />);
  }, [problemHistory]);

  useEffect(() => {
    if (showHistory) {
      openModal({
        title: 'Problem History',
        size: 'responsive',
        onClose: () => setShowHistory(false),
        children: <>{renderHistory}</>,
      });
    }
  }, [showHistory]);

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800'>
      <DarkModeToggle />
      <ReloadWarning />
      <main className='container mx-auto px-4 py-8 max-w-2xl'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
          Math Problem Generator
        </h1>
        {error && <ErrorCard error={error} />}
        <div className='mb-4 flex justify-end'>
          <BackButton />
        </div>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-800'>
          <button
            onClick={generateProblem}
            disabled={isLoading.type === 'generate' && isLoading.isLoading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'
          >
            {isLoading.type === 'generate' && isLoading.isLoading
              ? 'Generating...'
              : 'Generate New Problem'}
          </button>
        </div>

        {(score > 0 || problemHistory.length > 0) && <StatCard />}
        {problem && <ProblemCard {...problem} />}

        {feedback && (
          <FeedbackCard
            isCorrect={isCorrect}
            feedback={feedback}
          />
        )}
      </main>
    </div>
  );
}
