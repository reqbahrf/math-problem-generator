'use client';

import { memo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ViewHistoryCard from '@/app/components/stats/ProblemStatCard';
import PieChart from '@/app/components/chart/PieChart';
import LineChart from '@/app/components/chart/LineChart';
import {
  RiDeleteBin2Line,
  RiPlayCircleLine,
  RiFileDownloadLine,
} from '@remixicon/react';
import { useModalContext } from '@/app/context/useModalContext';
import SessionResumeNotice from '@/app/components/modalBody/SessionResumeNotice';
import { useThemeContext } from '../context/ThemeContext';
import type { ProcessedSession } from '@/app/types/processSession';
import usePdfGeneration from '@/app/hook/usePdfGeneration';

interface SessionHistoryCardProps {
  processedSession: ProcessedSession;
  dlSession: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SessionHistoryCard: React.FC<SessionHistoryCardProps> = ({
  processedSession,
  dlSession,
}) => {
  const { isDarkTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal } = useModalContext();
  const { generatePdf } = usePdfGeneration();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const handlePDFGeneration = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    generatePdf(processedSession);
  };

  const handleResumeSession = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.sessionId;
    if (!id) return;
    openModal({
      title: 'Confirm',
      headerColor: 'bg-blue-600 dark:bg-blue-400',
      children: (
        <SessionResumeNotice
          sessionId={id}
          closeModal={closeModal}
        />
      ),
      size: 'md',
      triggerRef,
    });
  };
  return (
    <motion.div
      layout
      className='bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/50 relative'
      whileHover={{ scale: 1.01 }}
    >
      {/* Header Section */}
      <div
        className='flex justify-between items-center mb-4 cursor-pointer select-none '
        onClick={toggleDropdown}
      >
        <div className='w-full'>
          <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2'>
            🧮 Session{' '}
            <span className='text-blue-600 dark:text-blue-400 truncate max-w-[150px] sm:max-w-[250px]'>
              {processedSession.session.id}
            </span>
          </h1>

          <h2 className='ps-4 text-lg font-medium text-gray-700 dark:text-gray-300 mt-1'>
            Started:{' '}
            <span className='text-blue-600 dark:text-blue-400 font-semibold'>
              {new Date(processedSession.session.createdAt).toLocaleString()}
            </span>
          </h2>

          <h3 className='ps-4 text-lg font-medium text-gray-700 dark:text-gray-300'>
            Score:{' '}
            <span
              className={`font-semibold ${
                processedSession.session.score > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {processedSession.session.score} /{' '}
              {processedSession.session.problems.length}
            </span>
          </h3>
          <div className='flex gap-4 ps-4 text-md font-medium text-gray-700 dark:text-gray-300'>
            <div>
              Problem Level:{' '}
              <span className='text-gray-500 dark:text-gray-400'>
                Grade {processedSession.session.gradeLevel}
              </span>
            </div>
            <div>
              Status:{' '}
              <span
                className={`text-blue-600 dark:text-blue-400 ${
                  processedSession.session.status === 'Completed'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {processedSession.session.status}
              </span>
            </div>
          </div>
          <div className='mt-2 text-md font-medium text-gray-700 dark:text-gray-300'>
            Progress: {processedSession.numberOfAnsweredQuestions} /{' '}
            {processedSession.problemCount} (
            {(
              (processedSession.numberOfAnsweredQuestions /
                processedSession.problemCount) *
              100
            ).toFixed(2)}
            %)
            <div className='w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-600 dark:bg-blue-400'
                style={{
                  width: `${
                    (processedSession.numberOfAnsweredQuestions /
                      processedSession.problemCount) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
        <motion.button
          onClick={toggleDropdown}
          className='p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100/70 dark:hover:bg-blue-900/40 transition-colors duration-200'
          aria-label={isOpen ? 'Hide session details' : 'Show session details'}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </motion.button>
        <div className='absolute top-[-10px] right-[-10px]'>
          {processedSession.session.status !== 'Completed' && (
            <motion.button
              ref={triggerRef}
              data-session-id={processedSession.session.id}
              onClick={handleResumeSession}
              className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <RiPlayCircleLine size={32} />
            </motion.button>
          )}
          <motion.button
            data-session-id={processedSession.session.id}
            onClick={dlSession}
            className='text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <RiDeleteBin2Line size={32} />
          </motion.button>
        </div>
      </div>

      {/* Expandable History Section */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='content'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='space-y-4 mt-6 border-t border-gray-200 dark:border-gray-600 pt-6'>
              {/* Charts Section */}
              {processedSession.session.problems.length !== 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mb-6'>
                  <div className='min-h-80 mb-8 md:mb-0'>
                    <h3 className='md:text-lg text-sm text-center md:text-start font-semibold text-gray-800 dark:text-gray-100 mb-4'>
                      Problem Types Distribution
                    </h3>
                    <PieChart
                      series={processedSession.problemTypeSeries}
                      labels={processedSession.categories}
                      theme={isDarkTheme ? 'dark' : 'light'}
                    />
                  </div>
                  <div className='min-h-80 mb-8 md:mb-0'>
                    <h3 className='md:text-lg text-sm text-center md:text-start font-semibold text-gray-800 dark:text-gray-100'>
                      Difficulty Level Distribution
                    </h3>
                    <LineChart
                      series={processedSession.difficultySeries}
                      categories={processedSession.difficultyCategories}
                      theme={isDarkTheme ? 'dark' : 'light'}
                    />
                  </div>
                </div>
              )}

              {processedSession.session.problems.length === 0 ? (
                <p className='text-center text-gray-600 dark:text-gray-400 italic'>
                  No problems recorded for this session.
                </p>
              ) : (
                <>
                  {processedSession.session.problems.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ViewHistoryCard
                        questionId={processedSession.session.id}
                        {...p}
                      />
                    </motion.div>
                  ))}
                  <div className='flex justify-end'>
                    <motion.button
                      data-session-id={processedSession.session.id}
                      onClick={handlePDFGeneration}
                      className='py-2 px-4 rounded-full bg-white dark:bg-gray-900 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600'
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      aria-label='Download Session Report as PDF'
                    >
                      <RiFileDownloadLine
                        size={24}
                        className='inline-block'
                      />
                      &nbsp;Export
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(SessionHistoryCard);
