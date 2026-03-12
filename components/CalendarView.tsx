'use client';

import React, { useState, useMemo } from 'react';
import { Program } from '@/lib/types';

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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={prevMonth}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            ←
          </button>
          <span className="w-32 text-center font-medium text-gray-900">{monthName}</span>
          <button
            onClick={nextMonth}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            →
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center font-semibold text-gray-700 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
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
              className={`min-h-20 p-2 border rounded-lg transition ${
                day
                  ? `border-gray-200 hover:border-blue-400 ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'
                    }`
                  : 'bg-gray-50 border-transparent'
              }`}
            >
              {day && (
                <>
                  <div
                    className={`font-semibold text-sm mb-1 ${
                      isToday ? 'text-blue-600' : 'text-gray-900'
                    }`}
                  >
                    {day}
                  </div>
                  {dayPrograms.length > 0 && (
                    <div className="space-y-1">
                      {dayPrograms.slice(0, 2).map((prog) => (
                        <div
                          key={prog.id}
                          className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate"
                          title={prog.title}
                        >
                          {prog.icon} {prog.title}
                        </div>
                      ))}
                      {dayPrograms.length > 2 && (
                        <div className="text-xs text-gray-500 px-1">
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

      {/* Weekly events list */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-3">Recurring Weekly Events</h3>
        <div className="space-y-2">
          {weeklyPrograms.map((prog) => (
            <div
              key={prog.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{prog.icon}</span>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{prog.title}</p>
                  <p className="text-sm text-gray-600">
                    {prog.day} at {prog.time}
                  </p>
                </div>
              </div>
              {currentUser && onToggleRegistration && (
                <button
                  onClick={() => onToggleRegistration(prog.id)}
                  className={`px-3 py-1 text-sm rounded transition flex-shrink-0 ${
                    registeredProgramIds.includes(prog.id)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {registeredProgramIds.includes(prog.id) ? '✓ Registered' : 'Register'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
