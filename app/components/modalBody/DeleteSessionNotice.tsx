import React from 'react';

interface DeleteSessionNoticeProps {
  id: string;
  closeModal: () => void;
  deleteSession: (id: string) => Promise<void>;
  setSessions: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteSessionNotice: React.FC<DeleteSessionNoticeProps> = ({
  id,
  closeModal,
  deleteSession,
  setSessions,
}) => {
  return (
    <div className='flex flex-col gap-2 text-center'>
      You are about to delete session{' '}
      <span className='font-semibold text-sm'>{id}</span>
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
          className='bg-red-600 dark:bg-red-400 px-4 py-2 rounded'
          onClick={() =>
            deleteSession(id).then(() => {
              setSessions((prev) => prev.filter((s) => s.id !== id));
              closeModal();
            })
          }
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteSessionNotice;
