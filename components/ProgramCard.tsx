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
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
      <div className="flex gap-4 items-start">
        {/* Icon with background */}
        <div className="text-5xl p-3 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {program.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">{program.title}</h3>
              {program.category && (
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mt-1.5">
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
          <div className="space-y-2 mb-4 text-sm">
            {program.time && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">🕐</span>
                <span className="font-medium">{program.time}</span>
              </div>
            )}

            {(program.day || program.occurrence) && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">📆</span>
                <span>{program.day || program.occurrence}</span>
              </div>
            )}

            {program.venue && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">📍</span>
                <span className="truncate">{program.venue}</span>
              </div>
            )}

            {program.platform && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">💻</span>
                <span className="font-medium">{program.platform}</span>
              </div>
            )}

            {program.note && (
              <div className="mt-2 inline-block bg-accent/10 text-accent px-3 py-1.5 rounded-lg text-xs font-semibold">
                {program.note}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {program.link && (
              <a
                href={program.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:shadow-md transition-all hover:scale-105 active:scale-95 text-center"
              >
                Join Online
              </a>
            )}

            {currentUser && onToggleRegistration && !isAdmin && (
              <button
                onClick={onToggleRegistration}
                className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isRegistered
                    ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                    : 'bg-secondary text-secondary-foreground hover:shadow-md'
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
