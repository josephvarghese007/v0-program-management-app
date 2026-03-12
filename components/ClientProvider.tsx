'use client';

import React from 'react';
import { AppProvider } from '@/lib/context';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
