'use client';
import { useCallback, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}
const useTheme: () => ThemeContextType = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('themeIsDark') === 'true' ||
        (!localStorage.getItem('themeIsDark') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (isDarkTheme) {
        root.classList.add('dark');
        localStorage.setItem('themeIsDark', 'true');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('themeIsDark', 'false');
      }
    }
  }, [isDarkTheme]);
  const toggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.themeIsDark = !isDarkTheme;
  }, [isDarkTheme]);
  return { isDarkTheme, toggleTheme };
};
export default useTheme;
