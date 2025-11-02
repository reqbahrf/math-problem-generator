'use client';

import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useMathProblem } from '@/app/context/MathProblemContext';

const ReloadWarning = () => {
  const { score, problemHistory } = useMathProblem();
  const [showReloadWarning, setShowReloadWarning] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (score > 0 || problemHistory.length > 0) {
        event.preventDefault();
        event.returnValue = '';
        setShowReloadWarning(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [score, problemHistory]);

  if (!showReloadWarning) return null;

  return (
    <Modal
      title='⚠️ Warning: Progress will be lost'
      size='sm'
      triggerRef={undefined}
      onClose={() => setShowReloadWarning(false)}
    >
      <div className='text-center space-y-4'>
        <p className='text-gray-700 text-md dark:text-gray-300'>
          Reloading will reset your score and problem history. Are you sure you
          want to continue?
        </p>
        <div className='flex justify-center gap-4 mt-6'>
          <button
            onClick={() => {
              setShowReloadWarning(false);
              window.removeEventListener('beforeunload', () => {});
              window.location.reload();
            }}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
          >
            Reload Anyway
          </button>
          <button
            onClick={() => setShowReloadWarning(false)}
            className='bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReloadWarning;
