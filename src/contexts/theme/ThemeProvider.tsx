import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { SelectedTheme, ThemeMode } from './ThemeContext';

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = 'theme';
const THEME_MODES: ThemeMode[] = ['auto', 'light', 'dark'];
const PREFERS_DARK = '(prefers-color-scheme: dark)';

const isThemeMode = (value: unknown): value is ThemeMode => {
  return value === 'auto' || value === 'light' || value === 'dark';
};

const getSystemTheme = (): SelectedTheme => {
  return window.matchMedia(PREFERS_DARK).matches ? 'dark' : 'light';
};

const selectTheme = (theme: ThemeMode): SelectedTheme => {
  return theme === 'auto' ? getSystemTheme() : theme;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    return isThemeMode(savedTheme) ? savedTheme : 'auto';
  });

  const [selectedTheme, setSelectedTheme] = useState<SelectedTheme>(() => selectTheme(theme));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);

    const apply = () => {
      const selected = selectTheme(theme);

      document.documentElement.dataset.theme = selected;
      setSelectedTheme(selected);
    };

    apply();

    if (theme !== 'auto') {
      return;
    }

    const mediaQuery = window.matchMedia(PREFERS_DARK);

    mediaQuery.addEventListener('change', apply);

    return () => {
      mediaQuery.removeEventListener('change', apply);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextIndex = (THEME_MODES.indexOf(current) + 1) % THEME_MODES.length;

      return THEME_MODES[nextIndex];
    });
  };

  const value = {
    theme,
    selectedTheme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
