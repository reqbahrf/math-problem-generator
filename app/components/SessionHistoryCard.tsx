'use client';

import { memo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LocalSession } from '@/lib/sessionStorage';
import ViewHistoryCard from '@/app/components/stats/ViewHistoryCard';
import { RiDeleteBin2Line, RiPlayCircleLine } from '@remixicon/react';
import { useModalContext } from '@/app/context/useModalContext';
import SessionResumeNotice from '@/app/components/modalBody/SessionResumeNotice';

interface SessionHistoryCardProps {
  session: LocalSession;
  dlSession: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SessionHistoryCard = ({
  session,
  dlSession,
}: SessionHistoryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal } = useModalContext();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const numberOfAnsweredQuestions = session.problems.filter(
    (p) => p.userAnswer !== null
  ).length;
  const problemCount = session.problems.length;

  const handleResumeSession = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.sessionId;
    if (!id) return;
    openModal({
      title: 'Confirm',
      headerColor: 'bg-red-600 dark:bg-red-400',
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
              {session.id}
            </span>
          </h1>

          <h2 className='ps-4 text-lg font-medium text-gray-700 dark:text-gray-300 mt-1'>
            Started:{' '}
            <span className='text-blue-600 dark:text-blue-400 font-semibold'>
              {new Date(session.createdAt).toLocaleString()}
            </span>
          </h2>

          <h3 className='ps-4 text-lg font-medium text-gray-700 dark:text-gray-300'>
            Score:{' '}
            <span
              className={`font-semibold ${
                session.score > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {session.score} / {session.problems.length}
            </span>
          </h3>
          <div className='flex gap-4 ps-4 text-md font-medium text-gray-700 dark:text-gray-300'>
            <div>
              Problem Level:{' '}
              <span className='text-gray-500 dark:text-gray-400'>
                Grade {session.gradeLevel}
              </span>
            </div>
            <div>
              Status:{' '}
              <span
                className={`text-blue-600 dark:text-blue-400 ${
                  session.status === 'Completed'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {session.status}
              </span>
            </div>
          </div>
          <div className='mt-2 text-md font-medium text-gray-700 dark:text-gray-300'>
            Progress: {numberOfAnsweredQuestions} / {problemCount} (
            {((numberOfAnsweredQuestions / problemCount) * 100).toFixed(2)}
            %)
            <div className='w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-600 dark:bg-blue-400'
                style={{
                  width: `${(numberOfAnsweredQuestions / problemCount) * 100}%`,
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
          {session.status === 'Incomplete' && (
            <motion.button
              ref={triggerRef}
              data-session-id={session.id}
              onClick={handleResumeSession}
              className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <RiPlayCircleLine size={32} />
            </motion.button>
          )}
          <motion.button
            data-session-id={session.id}
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
              {session.problems.length === 0 ? (
                <p className='text-center text-gray-600 dark:text-gray-400 italic'>
                  No problems recorded for this session.
                </p>
              ) : (
                session.problems.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ViewHistoryCard
                      questionId={session.id}
                      {...p}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(SessionHistoryCard);
