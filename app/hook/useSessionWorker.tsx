'use client';
import { useEffect, useRef, useState } from 'react';
import { LocalSession } from '@/lib/sessionStorage';
import { ProcessedSession } from '@/app/workers/session.worker';

export default function useStateWorker<
  T extends LocalSession[],
  U extends ProcessedSession[]
>(sessions: T): { processedSessions: U | null; isLoading: boolean } {
  const workerRef = useRef<Worker>();
  const [processedSessions, setProcessedSessions] = useState<U | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL('@/app/workers/session.worker.ts', import.meta.url),
        { type: 'module' }
      );
    }

    const worker = workerRef.current;
    worker.postMessage(sessions);
    worker.onmessage = (e: MessageEvent<U>) => {
      setProcessedSessions(e.data);
      setIsLoading(false);
    };
    return () => {
      worker.onmessage = null;
    };
  }, [sessions]);

  return { processedSessions, isLoading };
}
