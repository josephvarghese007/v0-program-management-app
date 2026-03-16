'use client';

import React, { useMemo, useState, useEffect } from 'react';
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
    <div>
      <div className="flex items-center gap-3 mb-4 pb-4 border-b">
        <span className="text-2xl">{displayIcon}</span>
        <h2 className="text-xl font-bold text-gray-900">{displayTitle}</h2>
        {isHydrated && filteredPrograms.length > 0 && (
          <span className="ml-auto bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
            {filteredPrograms.length}
          </span>
        )}
      </div>

      <div className="space-y-3">
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
    </div>
  );
}
