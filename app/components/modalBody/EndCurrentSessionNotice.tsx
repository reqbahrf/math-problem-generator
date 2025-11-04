import React from 'react';

interface EndCurrentSessionNoticeProps {
  resolve: (value: unknown) => void;
  invalidateCurrentSession: () => void;
  closeModal: () => void;
}

const EndCurrentSessionNotice: React.FC<EndCurrentSessionNoticeProps> = ({
  resolve,
  invalidateCurrentSession,
  closeModal,
}) => {
  return (
    <div className='flex flex-col gap-2 text-center'>
      Current session will end. Are you sure you want to leave this page? <br />
      You can resume this session by going to the{' '}
      <span className='font-bold'>View Previous Session</span> page.
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
  );
};

export default EndCurrentSessionNotice;
