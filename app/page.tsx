'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { createNewSession } from '@/lib/sessionStorage';
import DarkModeToggle from './components/DarkModeToggle';
import useSessions from '@/app/hook/useSessions';
import ConfigForm from './components/ConfigForm';
import { useModalContext } from './context/useModalContext';

export default function IndexPage() {
  const router = useRouter();
  const { sessions, isGetSessionLoading } = useSessions();
  const { openModal, closeModal } = useModalContext();

  const handleStart = async () => {
    openModal({
      title: 'Configure Session',
      headerColor: 'bg-blue-600',
      size: 'md',
      children: (
        <ConfigForm
          closeModal={closeModal}
          router={router}
        />
      ),
    });
  };

  if (isGetSessionLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 p-6 md:p-8'>
        <DarkModeToggle />
        <p>Checking your previous sessions...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-6 relative overflow-hidden'>
      <DarkModeToggle />

      {/* Decorative blurred circles */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-3xl -translate-x-20 -translate-y-20' />
      <div className='absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/30 dark:bg-indigo-500/20 rounded-full blur-3xl translate-x-20 translate-y-20' />

      <main className='relative z-10 text-center max-w-3xl'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent'
        >
          Math Problem Generator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='text-lg sm:text-xl leading-relaxed mb-10 text-gray-700 dark:text-gray-300'
        >
          Sharpen your arithmetic, fractions, and geometry skills with
          AI-powered math problems designed for Primary 5 learners. Each problem
          comes with hints, step-by-step explanations, and personalized
          feedback.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className='grid sm:grid-cols-3 gap-6 text-left mb-12'
        >
          <div className='bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md backdrop-blur-sm'>
            <h3 className='text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400'>
              🎯 Practice
            </h3>
            <p className='text-gray-700 dark:text-gray-300 text-sm'>
              Generate math problems tailored for your level and track your
              progress easily.
            </p>
          </div>

          <div className='bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md backdrop-blur-sm'>
            <h3 className='text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400'>
              💡 Learn
            </h3>
            <p className='text-gray-700 dark:text-gray-300 text-sm'>
              View hints and step-by-step solutions to understand how to solve
              each problem the right way.
            </p>
          </div>

          <div className='bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md backdrop-blur-sm'>
            <h3 className='text-xl font-semibold mb-2 text-green-600 dark:text-green-400'>
              🧠 Improve
            </h3>
            <p className='text-gray-700 dark:text-gray-300 text-sm'>
              Receive friendly, AI-generated feedback to help you learn from
              mistakes and get better each time.
            </p>
          </div>
        </motion.div>

        <div className='flex flex-col gap-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className='px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all'
          >
            Start Practicing →
          </motion.button>
          {sessions.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/generator/history')}
              className='px-8 py-4 text-md font-semibold rounded-xl text-blue-600 dark:text-white shadow-lg hover:shadow-xl transition-all'
            >
              View Previous Sessions →
            </motion.button>
          )}
        </div>
      </main>
    </div>
  );
}
