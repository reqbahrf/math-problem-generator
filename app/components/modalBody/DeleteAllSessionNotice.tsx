import React from 'react';

interface DeleteAllSessionNoticeProps {
  closeModal: () => void;
  deleteAllSessions: () => Promise<void>;
  setSessions: React.Dispatch<React.SetStateAction<any[]>>;
}
const DeleteAllSessionNotice: React.FC<DeleteAllSessionNoticeProps> = ({
  closeModal,
  deleteAllSessions,
  setSessions,
}) => {
  return (
    <div className='flex flex-col gap-2 text-center'>
      You are about to delete all sessions
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
            deleteAllSessions().then(() => {
              setSessions([]);
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

export default DeleteAllSessionNotice;
