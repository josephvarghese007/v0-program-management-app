'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgramIconProps {
  icon?: string;
  className?: string;
  fallback?: string;
}

const materialPattern = /^[a-z0-9_]+$/;

export function ProgramIcon({ icon, className, fallback = 'event' }: ProgramIconProps) {
  const safeIcon = icon?.trim() || fallback;
  const isMaterial = materialPattern.test(safeIcon);

  if (isMaterial) {
    return (
      <span className={cn('material-symbols-rounded leading-none', className)} aria-hidden="true">
        {safeIcon}
      </span>
    );
  }

  return (
    <span className={cn('leading-none', className)} aria-hidden="true">
      {safeIcon}
    </span>
  );
}
