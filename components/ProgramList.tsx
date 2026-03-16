'use client';

import React, { useMemo } from 'react';
import { Program } from '@/lib/types';
import { ProgramCard } from './ProgramCard';

interface ProgramListProps {
  programs: Program[];
  category: 'daily' | 'weekly' | 'monthly';
  isAdmin?: boolean;
  onEdit?: (program: Program) => void;
  onDelete?: (id: string) => void;
  registeredProgramIds?: string[];
  onToggleRegistration?: (programId: string) => void;
  title?: string;
  icon?: string;
}

export function ProgramList({
  programs,
  category,
  isAdmin = false,
  onEdit,
  onDelete,
  registeredProgramIds = [],
  onToggleRegistration,
  title,
  icon,
}: ProgramListProps) {
  const filteredPrograms = useMemo(
    () => programs.filter((p) => p.category === category),
    [programs, category]
  );

  const labels: Record<string, string> = {
    daily: 'Daily Online Prayers',
    weekly: 'Weekly Meetings',
    monthly: 'Monthly Meetings',
  };

  const icons: Record<string, string> = {
    daily: '☀️',
    weekly: '📅',
    monthly: '🗓️',
  };

  const displayTitle = title || labels[category];
  const displayIcon = icon || icons[category];

  return (
    <div className="space-y-4">
      {filteredPrograms.length > 0 ? (
        filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            isRegistered={registeredProgramIds.includes(program.id)}
            onToggleRegistration={
              onToggleRegistration ? () => onToggleRegistration(program.id) : undefined
            }
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No programs yet</p>
          {isAdmin && <p className="text-sm mt-1">Click "Add Program" to get started</p>}
        </div>
      )}
    </div>
  );
}
