'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isFeatureEnabled } from '@/lib/features';

export type ThemeMode = 'dark' | 'light' | 'amoled';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isThemeModesEnabled: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const isThemeModesEnabled = isFeatureEnabled('THEME_MODES');

  useEffect(() => {
    // Load saved theme preference
    if (typeof window !== 'undefined' && isThemeModesEnabled) {
      const saved = localStorage.getItem('jy-theme') as ThemeMode | null;
      if (saved && ['dark', 'light', 'amoled'].includes(saved)) {
        setThemeState(saved);
      }
    }
  }, [isThemeModesEnabled]);

  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('dark', 'light', 'amoled');

    // Apply current theme
    if (theme === 'amoled') {
      root.classList.add('dark', 'amoled');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jy-theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isThemeModesEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
