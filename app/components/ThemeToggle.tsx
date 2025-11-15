'use client';

import { useThemeContext } from '@/app/context/ThemeContext';
import { RiSunFill, RiMoonFill } from '@remixicon/react';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  return (
    <div className='fixed top-4 right-4 z-50'>
      <button
        onClick={toggleTheme}
        className='p-2 rounded-full shadow-sm text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 transition'
        aria-label='Toggle Theme'
      >
        {!isDarkTheme ? <RiMoonFill /> : <RiSunFill />}
      </button>
    </div>
  );
};

export default ThemeToggle;
