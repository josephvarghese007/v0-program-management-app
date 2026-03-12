'use client';

import React, { useMemo } from 'react';
import { useApp } from '@/lib/context';
import { Program } from '@/lib/types';

interface UserRegistrationsProps {
  programs: Program[];
}

export function UserRegistrations({ programs }: UserRegistrationsProps) {
  const { currentUser, registrations } = useApp();

  const userRegistrations = useMemo(() => {
    if (!currentUser) return [];
    return registrations
      .filter((r) => r.userId === currentUser.id)
      .map((r) => ({
        ...r,
        program: programs.find((p) => p.id === r.programId),
      }))
      .filter((r) => r.program);
  }, [currentUser, registrations, programs]);

  if (!currentUser) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-blue-700 font-medium">Please log in to see your registrations</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">My Registrations</h2>
        <p className="text-sm text-gray-600 mt-1">Events you've signed up for</p>
      </div>

      {userRegistrations.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {userRegistrations.map((reg) => {
            if (!reg.program) return null;
            const prog = reg.program;

            return (
              <div key={reg.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{prog.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{prog.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{prog.description}</p>

                    {/* Details */}
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      {prog.category === 'daily' && (
                        <>
                          <div>Platform: {prog.platform}</div>
                          <div>Time: {prog.time}</div>
                          {prog.link && (
                            <div>
                              <a href={prog.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                                Join Link →
                              </a>
                            </div>
                          )}
                        </>
                      )}

                      {prog.category === 'weekly' && (
                        <>
                          <div>{prog.day} at {prog.time}</div>
                          <div>Location: {prog.venue}</div>
                        </>
                      )}

                      {prog.category === 'monthly' && (
                        <>
                          <div>{prog.occurrence} at {prog.time}</div>
                          <div>Location: {prog.venue}</div>
                          {prog.note && <div>Note: {prog.note}</div>}
                        </>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="mt-3 inline-block">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        ✓ Registered
                      </span>
                    </div>
                  </div>

                  {/* Registered Date */}
                  <div className="text-right text-xs text-gray-500 flex-shrink-0">
                    <div>Registered</div>
                    <div className="font-medium">
                      {new Date(reg.registeredAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-gray-600 font-medium">No registrations yet</p>
          <p className="text-sm text-gray-500 mt-1">Browse programs and register to get started</p>
        </div>
      )}
    </div>
  );
}
