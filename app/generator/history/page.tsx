'use client';

import DarkModeToggle from '@/app/components/DarkModeToggle';
import SessionHistoryCard from '@/app/components/SessionHistoryCard';
import useSessions from '@/app/hook/useSessions';
import BackButton from '@/app/components/BackButton';
import useDeleteSession from '@/app/hook/useDeleteSession';

export default function HistoryPage() {
  const { sessions, isGetSessionLoading, setSessions } = useSessions();
  const { dlSession, dlAllSessions } = useDeleteSession(setSessions);
  if (isGetSessionLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 p-6 md:p-8'>
        <DarkModeToggle />
        <p>Checking your previous sessions...</p>
      </div>
    );
  }
  if (!sessions.length)
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 p-6 md:p-8'>
        <DarkModeToggle />
        <p>No previous sessions found. Go back to generate a new problem.</p>
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-8'>
      <DarkModeToggle />

      <h1 className='text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white'>
        Your Previous Sessions
      </h1>

      <div className='mb-8 flex justify-end gap-4'>
        <BackButton />
        <button
          onClick={dlAllSessions}
          className='bg-red-600 dark:bg-red-400 px-4 py-2 rounded'
        >
          Delete All Sessions
        </button>
      </div>
      <div className='space-y-10'>
        {sessions.map((session) => (
          <SessionHistoryCard
            key={session.id}
            session={session}
            dlSession={dlSession}
          />
        ))}
      </div>
    </div>
  );
}
