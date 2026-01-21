'use client';

import { useState, useEffect, useCallback } from 'react';

interface Quote {
  quote: string;
  authorOrReference: string;
}
// In useQuotes.tsx
const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = useCallback(async () => {
    if (quotes.length > 0) return; // Don't refetch if we already have data

    setIsLoading(true);
    try {
      const res = await fetch(
        'https://gist.githubusercontent.com/reqbahrf/eccd256a628173b340cee32bcabc4cdd/raw/21b2478efd0afd6913615c8904ec44d4ef735085/notable_bible_verses.csv',
      );

      if (!res.ok) {
        throw new Error('Failed to fetch quote');
      }

      const csv = await res.text();
      const rows = csv.trim().split('\n');
      const data = rows.map((row) => {
        const parts = row.split(/(?<=[0-9]),/);
        return { authorOrReference: parts[0], quote: parts[1] };
      });
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setIsLoading(false);
    }
  }, [quotes]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const getRandomQuote = () => {
    if (quotes.length === 0) {
      return { quote: 'Loading inspirational quote...', authorOrReference: '' };
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return { ...quotes[randomIndex] };
  };

  return { getRandomQuote, fetchQuote, isLoading, quotes };
};

export default useQuotes;
