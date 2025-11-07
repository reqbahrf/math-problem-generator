'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/sessionStorage';

interface SessionResumeNoticeProps {
  sessionId: string;
  closeModal: () => void;
}

const SessionResumeNotice: React.FC<SessionResumeNoticeProps> = ({
  sessionId,
  closeModal,
}) => {
  const router = useRouter();

  const handleConfirm = async () => {
    sessionStorage.setItem('activeSession', sessionId);
    const existingSession = await getSession(sessionId);
    if (existingSession) {
      router.push(
        `/generator?resume=true&count=${existingSession.count}&gradeLevel=${existingSession.gradeLevel}`
      );
    }
    closeModal();
  };
  return (
    <div className='flex flex-col gap-2 text-center'>
      You are about to resume a session
      <br />
      Are you sure?
      <div className='flex justify-center gap-2'>
        <button
          className='bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded'
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          className='bg-blue-600 dark:bg-blue-400 px-4 py-2 rounded'
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SessionResumeNotice;
