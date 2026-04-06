'use client';

import React, { useState, useMemo } from 'react';
import { Program } from '@/lib/types';
import { ProgramIcon } from '../ui/ProgramIcon';

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
    <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Calendar</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Stay in sync with weekly programs.</p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border/60 bg-card/60 text-foreground hover:bg-muted/50 transition flex items-center justify-center"
          aria-label="Previous month"
        >
          <span className="material-symbols-rounded text-[18px] sm:text-[22px]">chevron_left</span>
        </button>
        <span className="font-semibold text-sm sm:text-base text-foreground">{monthName}</span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border/60 bg-card/60 text-foreground hover:bg-muted/50 transition flex items-center justify-center"
          aria-label="Next month"
        >
          <span className="material-symbols-rounded text-[18px] sm:text-[22px]">chevron_right</span>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="h-7 sm:h-10 flex items-center justify-center font-semibold text-muted-foreground text-[11px] sm:text-xs">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
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
              className={`min-h-10 sm:min-h-16 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border transition ${
                day
                  ? `border-border/40 ${
                      isToday ? 'bg-primary/10 border-primary/40' : 'bg-card/40'
                    }`
                  : 'border-transparent'
              }`}
            >
              {day && (
                <>
                  <div className={`font-semibold text-[11px] sm:text-xs text-center ${isToday ? 'text-primary' : 'text-foreground'}`}>
                    {day}
                  </div>
                  {dayPrograms.length > 0 && (
                    <div className="mt-0.5 space-y-0.5">
                      {dayPrograms.slice(0, 1).map((prog) => (
                        <div
                          key={prog.id}
                          className="w-full h-1 sm:h-1.5 bg-secondary/40 rounded-full"
                          title={prog.title}
                        />
                      ))}
                      {dayPrograms.length > 1 && (
                        <div className="w-full h-1 sm:h-1.5 bg-primary/30 rounded-full" />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Recurring Events */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/60">
        <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 sm:mb-3">Recurring Weekly Events</h3>
        <div className="space-y-2">
          {weeklyPrograms.map((prog) => (
            <div
              key={prog.id}
              className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-card/60 rounded-xl sm:rounded-2xl border border-border/60"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <ProgramIcon icon={prog.icon} className="text-base sm:text-lg text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{prog.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {prog.day} at {prog.time}
                  </p>
                </div>
              </div>
              {currentUser && onToggleRegistration && (
                <button
                  onClick={() => onToggleRegistration(prog.id)}
                  className={`px-2.5 py-1 text-xs sm:text-sm rounded-lg transition flex-shrink-0 border ${
                    registeredProgramIds.includes(prog.id)
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-card/60 text-foreground border-border/60'
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
