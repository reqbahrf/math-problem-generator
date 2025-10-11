'use client';

import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      localStorage.themeIsDark === 'true' ||
      (!('themeIsDark' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.themeIsDark = 'true';
    } else {
      root.classList.remove('dark');
      localStorage.themeIsDark = 'false';
    }
  }, [darkMode]);

  return (
    <div className='fixed top-4 right-4 z-50'>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition'
        aria-label='Toggle Dark Mode'
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default DarkModeToggle;
