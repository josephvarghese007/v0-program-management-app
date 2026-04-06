'use client';

import React from 'react';
import { AppProvider } from '@/lib/context';
import { ThemeProvider } from './ThemeProvider';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
