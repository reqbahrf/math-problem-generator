'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import Loading from '@/app/components/Loading';
interface LoadingContextProps {
  globalLoading: { state: boolean; message?: string };
  setGlobalLoading: (state: boolean, message?: string) => void;
  localLoading: Record<string, boolean>;
  setLocalLoading: (id: string, state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | null>(null);

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoadingState] = useState<{
    state: boolean;
    message?: string;
  }>({ state: false, message: '' });
  const [localLoading, setLocalLoadingState] = useState<
    Record<string, boolean>
  >({});

  const setGlobalLoading = useCallback((state: boolean, message?: string) => {
    setGlobalLoadingState({ state, message });
  }, []);

  const setLocalLoading = useCallback((id: string, state: boolean) => {
    setLocalLoadingState((prev) => ({
      ...prev,
      [id]: state,
    }));
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,
        localLoading,
        setLocalLoading,
      }}
    >
      {children}

      {/* Global overlay */}
      {globalLoading.state && <Loading message={globalLoading.message} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used inside <LoadingProvider>');
  return ctx;
};
