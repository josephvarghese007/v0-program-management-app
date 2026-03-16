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
}

export function ProgramList({
  programs,
  category,
  isAdmin = false,
  onEdit,
  onDelete,
  registeredProgramIds = [],
  onToggleRegistration,
}: ProgramListProps) {
  const filteredPrograms = useMemo(
    () => programs.filter((p) => p.category === category),
    [programs, category]
  );

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
        <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-8 text-center text-muted-foreground">
          <p className="text-lg font-semibold text-foreground">No programs yet</p>
          {isAdmin && <p className="text-sm mt-2">Use the Add Program buttons to get started.</p>}
        </div>
      )}
    </div>
  );
}
