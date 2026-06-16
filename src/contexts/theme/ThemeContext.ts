import { createContext } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';
export type SelectedTheme = 'light' | 'dark';

export interface ThemeContextInterface {
  theme: ThemeMode;
  selectedTheme: SelectedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: 'auto',
  selectedTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});
