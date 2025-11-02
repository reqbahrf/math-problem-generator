'use client';

import { useState, useEffect } from 'react';
import { LocalSession } from '@/lib/sessionStorage';
import { getAllSessions } from '@/lib/sessionStorage';

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

  return { sessions, isGetSessionLoading, setSessions };
};
export default useSessions;
