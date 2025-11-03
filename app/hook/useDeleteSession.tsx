import { deleteSession, deleteAllSessions } from '@/lib/sessionStorage';
import { useModalContext } from '../context/useModalContext';
import { useCallback } from 'react';

const useDeleteSession = (
  setSessions: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { openModal, closeModal } = useModalContext();

  const dlSession = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const id = e.currentTarget.dataset.sessionId;
      if (!id) return;

      openModal({
        title: 'Delete Session',
        headerColor: 'bg-red-600 dark:bg-red-400',
        children: (
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
        ),
        size: 'md',
      });
    },
    [openModal, closeModal, setSessions]
  );

  const dlAllSessions = useCallback(async () => {
    openModal({
      title: 'Delete All Sessions',
      headerColor: 'bg-red-600 dark:bg-red-400',
      children: (
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
      ),
      size: 'md',
    });
  }, [openModal, closeModal, setSessions]);

  return { dlSession, dlAllSessions };
};

export default useDeleteSession;
