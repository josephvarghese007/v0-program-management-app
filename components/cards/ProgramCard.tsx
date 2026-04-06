'use client';

import React from 'react';
import { Program } from '@/lib/types';
import { useApp } from '@/lib/context';
import { ProgramIcon } from '../ui/ProgramIcon';

interface ProgramCardProps {
  program: Program;
  isAdmin?: boolean;
  onEdit?: (program: Program) => void;
  onDelete?: (id: string) => void;
  isRegistered?: boolean;
  onToggleRegistration?: () => void;
}

export function ProgramCard({
  program,
  isAdmin = false,
  onEdit,
  onDelete,
  isRegistered = false,
  onToggleRegistration,
}: ProgramCardProps) {
  const { currentUser } = useApp();
  const categoryMeta = {
    daily: {
      label: 'Daily',
      icon: 'volunteer_activism',
      tone: 'text-primary border-primary/30 bg-primary/15',
    },
    weekly: {
      label: 'Weekly',
      icon: 'calendar_month',
      tone: 'text-secondary border-secondary/30 bg-secondary/15',
    },
    monthly: {
      label: 'Monthly',
      icon: 'celebration',
      tone: 'text-accent border-accent/30 bg-accent/15',
    },
  } as const;
  const categoryInfo = categoryMeta[program.category];

  return (
    <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex gap-3 sm:gap-5 items-start">
        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-border/60 shadow-sm flex-shrink-0">
          <ProgramIcon icon={program.icon} className="text-2xl sm:text-3xl text-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-xl font-semibold text-foreground tracking-tight truncate">{program.title}</h3>
              {categoryInfo && (
                <span className={`chip mt-1.5 sm:mt-2 text-[10px] sm:text-xs ${categoryInfo.tone}`}>
                  <ProgramIcon icon={categoryInfo.icon} className="text-xs sm:text-base" />
                  {categoryInfo.label}
                </span>
              )}
            </div>

            {isAdmin && (
              <div className="flex gap-1 flex-shrink-0">
                {onEdit && (
                  <button
                    onClick={() => onEdit(program)}
                    className="p-1.5 sm:p-2 rounded-lg text-primary hover:bg-primary/10 transition"
                    title="Edit"
                    aria-label="Edit program"
                  >
                    <span className="material-symbols-rounded text-base sm:text-lg">edit</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(program.id)}
                    className="p-1.5 sm:p-2 rounded-lg text-destructive hover:bg-destructive/10 transition"
                    title="Delete"
                    aria-label="Delete program"
                  >
                    <span className="material-symbols-rounded text-base sm:text-lg">delete</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {program.description && (
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {program.description}
            </p>
          )}

          <div className="mt-3 sm:mt-4 grid gap-1.5 sm:gap-2 text-sm">
            {program.time && (
              <div className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-border/60 bg-muted/40 px-2.5 py-1.5 sm:px-3 sm:py-2">
                <span className="material-symbols-rounded text-sm sm:text-base text-primary">schedule</span>
                <span className="font-semibold text-xs sm:text-sm text-foreground">{program.time}</span>
              </div>
            )}

            {(program.day || program.occurrence) && (
              <div className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-border/60 bg-muted/30 px-2.5 py-1.5 sm:px-3 sm:py-2">
                <span className="material-symbols-rounded text-sm sm:text-base text-secondary">calendar_today</span>
                <span className="font-medium text-xs sm:text-sm text-foreground">{program.day || program.occurrence}</span>
              </div>
            )}

            {program.venue && (
              <div className="flex items-center gap-2 text-muted-foreground px-1 py-0.5">
                <span className="material-symbols-rounded text-sm text-muted-foreground">location_on</span>
                <span className="truncate text-xs sm:text-sm">{program.venue}</span>
              </div>
            )}

            {program.platform && (
              <div className="flex items-center gap-2 text-muted-foreground px-1 py-0.5">
                <span className="material-symbols-rounded text-sm text-muted-foreground">videocam</span>
                <span className="font-medium text-xs sm:text-sm">{program.platform}</span>
              </div>
            )}

            {program.note && (
              <div className="mt-1 inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-accent/30 bg-accent/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-accent">
                <span className="material-symbols-rounded text-xs sm:text-sm">tips_and_updates</span>
                {program.note}
              </div>
            )}
          </div>

          <div className="mt-3 sm:mt-5 flex flex-wrap gap-2 sm:gap-3 border-t border-border/60 pt-3 sm:pt-5">
            {program.link && (
              <a
                href={program.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-center"
              >
                Join Online
              </a>
            )}

            {currentUser && onToggleRegistration && !isAdmin && (
              <button
                onClick={onToggleRegistration}
                className={`flex-1 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98] ${
                  isRegistered
                    ? 'bg-destructive/10 text-destructive border border-destructive/30'
                    : 'bg-card/60 text-foreground border border-border/60'
                }`}
              >
                {isRegistered ? 'Registered' : 'Register'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
