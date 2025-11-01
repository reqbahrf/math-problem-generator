'use client';

import { useEffect, useState } from 'react';
import { getAllSessions, LocalSession } from '@/lib/sessionStorage';
import ViewHistoryCard from '@/app/components/stats/ViewHistoryCard';
import DarkModeToggle from '@/app/components/DarkModeToggle';
import SessionHistoryCard from '@/app/components/SessionHistoryCard';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<LocalSession[]>([]);
  const [isGetSessionLoading, setIsGetSessionLoading] =
    useState<boolean>(false);

  useEffect(() => {
    setIsGetSessionLoading(true);
    getAllSessions()
      .then(setSessions)
      .finally(() => setIsGetSessionLoading(false));
  }, []);

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
        <p>No previous sessions found.</p>
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-8'>
      <DarkModeToggle />
      <h1 className='text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white'>
        Your Previous Sessions
      </h1>

      <div className='space-y-10'>
        {sessions.map((session) => (
          <SessionHistoryCard
            key={session.id}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
