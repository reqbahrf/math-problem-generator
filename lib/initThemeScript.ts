export const themeInitScript = `
(function() {
  try {
    const isDark =
      localStorage.themeIsDark === 'true' ||
      (!('themeIsDark' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
  } catch (_) {}
})();
`;
