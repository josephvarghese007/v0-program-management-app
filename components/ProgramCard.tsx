'use client';

import React from 'react';
import { Program } from '@/lib/types';
import { useApp } from '@/lib/context';

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

  return (
    <div className="bg-card/80 backdrop-blur-md rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 group relative overflow-hidden">
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0 pointer-events-none" />
      
      <div className="relative z-10 flex gap-5 items-start">
        {/* Icon with background */}
        <div className="text-5xl p-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-border/30 shadow-sm">
          {program.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h3 className="font-extrabold text-xl text-foreground mb-1 tracking-tight">{program.title}</h3>
              {program.category && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md mt-1 border border-primary/20">
                  {program.category === 'daily' && '🙏 Daily'}
                  {program.category === 'weekly' && '📅 Weekly'}
                  {program.category === 'monthly' && '🎉 Monthly'}
                </span>
              )}
            </div>
            {isAdmin && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                {onEdit && (
                  <button
                    onClick={() => onEdit(program)}
                    className="p-2 hover:bg-primary/10 rounded-lg transition text-primary"
                    title="Edit"
                  >
                    ✏️
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(program.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition text-destructive"
                    title="Delete"
                  >
                    🗑️
                  </button>
                )}
              </div>
            )}
          </div>

          {program.description && (
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">{program.description}</p>
          )}

          {/* Details Grid */}
          <div className="space-y-2 mb-5 text-sm">
            {program.time && (
              <div className="flex items-center gap-3 text-muted-foreground bg-accent/5 px-3 py-1.5 rounded-lg border border-accent/10">
                <span className="text-lg">🕐</span>
                <span className="font-semibold text-foreground">{program.time}</span>
              </div>
            )}

            {(program.day || program.occurrence) && (
              <div className="flex items-center gap-3 text-muted-foreground bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20">
                <span className="text-lg">📆</span>
                <span className="font-medium text-foreground">{program.day || program.occurrence}</span>
              </div>
            )}

            {program.venue && (
              <div className="flex items-center gap-3 text-muted-foreground px-2 py-1">
                <span className="text-lg">📍</span>
                <span className="truncate">{program.venue}</span>
              </div>
            )}

            {program.platform && (
              <div className="flex items-center gap-3 text-muted-foreground px-2 py-1">
                <span className="text-lg">💻</span>
                <span className="font-medium">{program.platform}</span>
              </div>
            )}

            {program.note && (
              <div className="mt-3 inline-block bg-accent/10 border border-accent/20 text-accent px-3 py-1.5 rounded-lg text-xs font-bold">
                💡 {program.note}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-5 border-t border-border/50">
            {program.link && (
              <a
                href={program.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                Join Online
              </a>
            )}

            {currentUser && onToggleRegistration && !isAdmin && (
              <button
                onClick={onToggleRegistration}
                className={`flex-1 px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${
                  isRegistered
                    ? 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20'
                    : 'bg-white border border-border text-foreground hover:bg-gray-50'
                }`}
              >
                {isRegistered ? '✓ Registered' : 'Register'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
