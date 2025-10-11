'use client';

import { useMathProblem } from './context/MathProblemContext';
import FeedbackCard from './components/FeedbackCard';
import ProblemCard from './components/problem/ProblemCard';

export default function Home() {
  const { generateProblem, problem, isLoading, feedback, isCorrect } =
    useMathProblem();
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      <main className='container mx-auto px-4 py-8 max-w-2xl'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
          Math Problem Generator
        </h1>

        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <button
            onClick={generateProblem}
            disabled={isLoading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'
          >
            {isLoading ? 'Generating...' : 'Generate New Problem'}
          </button>
        </div>

        {problem && <ProblemCard problemText={problem.problem_text} />}

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
