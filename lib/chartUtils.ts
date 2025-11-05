/**
 * Utility functions for chart components
 */

export class ChartThemeManager {
  private observer: MutationObserver | null = null;
  private onThemeChange: (theme: 'light' | 'dark') => void;

  constructor(onThemeChange: (theme: 'light' | 'dark') => void) {
    this.onThemeChange = onThemeChange;
  }

  getTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    }
    return 'light';
  }

  setupThemeObserver(): void {
    if (typeof window === 'undefined') return;

    this.observer = new MutationObserver(() => {
      const currentTheme = this.getTheme();
      this.onThemeChange(currentTheme);
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
