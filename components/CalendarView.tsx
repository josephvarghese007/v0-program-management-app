'use client';

import React, { useState, useMemo } from 'react';
import { Program } from '@/lib/types';
import { ProgramIcon } from './ProgramIcon';

interface CalendarViewProps {
  programs: Program[];
  registeredProgramIds?: string[];
  onToggleRegistration?: (programId: string) => void;
  currentUser?: { id: string; name: string } | null;
}

export function CalendarView({
  programs,
  registeredProgramIds = [],
  onToggleRegistration,
  currentUser,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weeklyPrograms = useMemo(() => {
    const dayMap: Record<string, string> = {
      Monday: '1',
      Tuesday: '2',
      Wednesday: '3',
      Thursday: '4',
      Friday: '5',
      Saturday: '6',
      Sunday: '0',
    };

    return programs.filter((p) => p.category === 'weekly' && p.day && dayMap[p.day]);
  }, [programs]);

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days: Array<number | null> = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getProgramsForDay = (day: number | null) => {
    if (!day) return [];

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      date.getDay()
    ];

    return weeklyPrograms.filter((p) => p.day === dayOfWeek || p.day === 'Various');
  };

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Calendar</h2>
          <p className="text-sm text-muted-foreground">Stay in sync with weekly programs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full border border-border/60 bg-card/60 text-foreground hover:bg-muted/50 transition"
            aria-label="Previous month"
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <span className="w-36 text-center font-semibold text-foreground">{monthName}</span>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full border border-border/60 bg-card/60 text-foreground hover:bg-muted/50 transition"
            aria-label="Next month"
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="h-10 flex items-center justify-center font-semibold text-muted-foreground text-xs">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          const dayPrograms = getProgramsForDay(day);
          const isToday =
            day &&
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={idx}
              className={`min-h-24 p-2 rounded-xl border transition ${
                day
                  ? `border-border/60 hover:border-primary/40 ${
                      isToday ? 'bg-primary/10 border-primary/40' : 'bg-card/60 hover:bg-muted/40'
                    }`
                  : 'bg-muted/20 border-transparent'
              }`}
            >
              {day && (
                <>
                  <div className={`font-semibold text-xs mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                    {day}
                  </div>
                  {dayPrograms.length > 0 && (
                    <div className="space-y-1">
                      {dayPrograms.slice(0, 2).map((prog) => (
                        <div
                          key={prog.id}
                          className="text-[11px] bg-secondary/15 text-foreground px-1.5 py-0.5 rounded-md truncate flex items-center gap-1"
                          title={prog.title}
                        >
                          <ProgramIcon icon={prog.icon} className="text-xs" />
                          {prog.title}
                        </div>
                      ))}
                      {dayPrograms.length > 2 && (
                        <div className="text-[11px] text-muted-foreground px-1">
                          +{dayPrograms.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border/60">
        <h3 className="font-semibold text-foreground mb-3">Recurring Weekly Events</h3>
        <div className="space-y-2">
          {weeklyPrograms.map((prog) => (
            <div
              key={prog.id}
              className="flex flex-wrap items-center justify-between gap-4 p-3 bg-card/60 rounded-2xl border border-border/60 hover:bg-muted/40 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ProgramIcon icon={prog.icon} className="text-lg text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{prog.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {prog.day} at {prog.time}
                  </p>
                </div>
              </div>
              {currentUser && onToggleRegistration && (
                <button
                  onClick={() => onToggleRegistration(prog.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition flex-shrink-0 border ${
                    registeredProgramIds.includes(prog.id)
                      ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20'
                      : 'bg-card/60 text-foreground border-border/60 hover:bg-muted/40'
                  }`}
                >
                  {registeredProgramIds.includes(prog.id) ? 'Registered' : 'Register'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
