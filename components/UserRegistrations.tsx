'use client';

import React, { useMemo } from 'react';
import { useApp } from '@/lib/context';
import { Program } from '@/lib/types';
import { ProgramIcon } from './ProgramIcon';

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
      <div className="glass-panel rounded-2xl p-6 text-center text-muted-foreground">
        Please log in to see your registrations.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border/60">
        <h2 className="text-xl font-semibold text-foreground">My Registrations</h2>
        <p className="text-sm text-muted-foreground mt-1">Events you have signed up for.</p>
      </div>

      {userRegistrations.length > 0 ? (
        <div className="divide-y divide-border/60">
          {userRegistrations.map((reg) => {
            if (!reg.program) return null;
            const prog = reg.program;

            return (
              <div key={reg.id} className="p-6 hover:bg-muted/30 transition">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <ProgramIcon icon={prog.icon} className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{prog.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{prog.description}</p>

                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {prog.category === 'daily' && (
                        <>
                          <div>Platform: {prog.platform}</div>
                          <div>Time: {prog.time}</div>
                          {prog.link && (
                            <div>
                              <a
                                href={prog.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-1"
                              >
                                Join Link
                                <span className="material-symbols-rounded text-sm">arrow_outward</span>
                              </a>
                            </div>
                          )}
                        </>
                      )}

                      {prog.category === 'weekly' && (
                        <>
                          <div>
                            {prog.day} at {prog.time}
                          </div>
                          <div>Location: {prog.venue}</div>
                        </>
                      )}

                      {prog.category === 'monthly' && (
                        <>
                          <div>
                            {prog.occurrence} at {prog.time}
                          </div>
                          <div>Location: {prog.venue}</div>
                          {prog.note && <div>Note: {prog.note}</div>}
                        </>
                      )}
                    </div>

                    <div className="mt-3 inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold border border-primary/30">
                      <span className="material-symbols-rounded text-sm">check_circle</span>
                      Registered
                    </div>
                  </div>

                  <div className="text-right text-xs text-muted-foreground flex-shrink-0">
                    <div>Registered</div>
                    <div className="font-semibold text-foreground">
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
          <div className="w-14 h-14 rounded-full bg-muted/40 border border-border/60 flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-rounded text-2xl text-muted-foreground">event_busy</span>
          </div>
          <p className="text-foreground font-semibold">No registrations yet</p>
          <p className="text-sm text-muted-foreground mt-1">Browse programs and register to get started.</p>
        </div>
      )}
    </div>
  );
}
