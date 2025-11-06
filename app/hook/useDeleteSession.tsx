import { deleteSession, deleteAllSessions } from '@/lib/sessionStorage';
import { useModalContext } from '../context/useModalContext';
import { useCallback } from 'react';
import DeleteSessionNotice from '../components/modalBody/DeleteSessionNotice';
import DeleteAllSessionNotice from '../components/modalBody/DeleteAllSessionNotice';

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
          <DeleteSessionNotice
            id={id}
            closeModal={closeModal}
            deleteSession={deleteSession}
            setSessions={setSessions}
          />
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
        <DeleteAllSessionNotice
          closeModal={closeModal}
          deleteAllSessions={deleteAllSessions}
          setSessions={setSessions}
        />
      ),
      size: 'md',
    });
  }, [openModal, closeModal, setSessions]);

  return { dlSession, dlAllSessions };
};

export default useDeleteSession;
