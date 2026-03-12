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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="text-3xl flex-shrink-0">{program.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{program.title}</h3>

          {program.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{program.description}</p>
          )}

          {/* Details */}
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            {program.time && (
              <div className="flex items-center gap-2">
                <span className="text-base">🕐</span>
                <span>{program.time}</span>
              </div>
            )}

            {program.day && (
              <div className="flex items-center gap-2">
                <span className="text-base">📆</span>
                <span>{program.day}</span>
              </div>
            )}

            {program.occurrence && (
              <div className="flex items-center gap-2">
                <span className="text-base">📅</span>
                <span>{program.occurrence}</span>
              </div>
            )}

            {program.venue && (
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span className="truncate">{program.venue}</span>
              </div>
            )}

            {program.platform && (
              <div className="flex items-center gap-2">
                <span className="text-base">💻</span>
                <span>{program.platform}</span>
              </div>
            )}

            {program.note && (
              <div className="mt-2 inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {program.note}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {program.link && (
            <a
              href={program.link}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition text-center"
            >
              Join
            </a>
          )}

          {currentUser && onToggleRegistration && (
            <button
              onClick={onToggleRegistration}
              className={`px-3 py-1 text-sm rounded transition text-center ${
                isRegistered
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isRegistered ? '✓ Registered' : 'Register'}
            </button>
          )}

          {isAdmin && (
            <div className="flex gap-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(program)}
                  className="px-2 py-1 text-sm bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition"
                  title="Edit"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(program.id)}
                  className="px-2 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition"
                  title="Delete"
                >
                  🗑️
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
