'use client';

import { useState } from 'react';
import { LocalSession } from '@/lib/sessionStorage';
import { getAllSessions } from '@/lib/sessionStorage';
import { useEffect } from 'react';

const useSessions = () => {
  const [sessions, setSessions] = useState<LocalSession[]>([]);
  const [isGetSessionLoading, setIsGetSessionLoading] =
    useState<boolean>(false);

  useEffect(() => {
    setIsGetSessionLoading(true);
    getAllSessions()
      .then(setSessions)
      .finally(() => setIsGetSessionLoading(false));
  }, []);

  return { sessions, isGetSessionLoading };
};
export default useSessions;
