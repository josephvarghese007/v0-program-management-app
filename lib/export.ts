import { Program } from './types';

export function exportProgramsToJSON(programs: Program[]): void {
  const data = JSON.stringify(programs, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jesus-youth-programs-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportProgramsToCSV(programs: Program[]): void {
  const headers = ['Title', 'Category', 'Type', 'Time', 'Day', 'Occurrence', 'Venue', 'Platform', 'Link', 'Description'];
  
  const rows = programs.map((p) => [
    p.title,
    p.category,
    p.type,
    p.time || '',
    p.day || '',
    p.occurrence || '',
    p.venue || '',
    p.platform || '',
    p.link || '',
    p.description || '',
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jesus-youth-programs-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportProgramsToICalendar(programs: Program[]): void {
  const events = programs
    .filter((p) => p.category !== 'daily' || p.link) // Include daily with links and offline events
    .map((p) => {
      const dtstart = generateDateTime(p);
      const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      
      return `BEGIN:VEVENT
UID:jy-${p.id}@jesusyouth.org
DTSTAMP:${dtstamp}
DTSTART:${dtstart}
SUMMARY:${escapeICalText(p.title)}
DESCRIPTION:${escapeICalText(p.description || p.title)}
LOCATION:${escapeICalText(p.venue || p.platform || 'Online')}
END:VEVENT`;
    });

  const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Jesus Youth//Angamaly Zone Programs//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Jesus Youth Programs
X-WR-TIMEZONE:Asia/Kolkata
${events.join('\n')}
END:VCALENDAR`;

  const blob = new Blob([ical], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jesus-youth-programs-${new Date().toISOString().split('T')[0]}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateDateTime(program: Program): string {
  const now = new Date();
  
  // For daily programs: use today
  if (program.category === 'daily') {
    const [hours, minutes] = (program.time || '09:00').split(':').map(Number);
    const date = new Date(now);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  // For weekly: find next occurrence
  if (program.day) {
    const dayMap: Record<string, number> = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
    };

    const targetDay = dayMap[program.day];
    if (targetDay !== undefined) {
      const date = new Date(now);
      const currentDay = date.getDay();
      const daysAhead = targetDay - currentDay;
      const daysToAdd = daysAhead <= 0 ? daysAhead + 7 : daysAhead;
      date.setDate(date.getDate() + daysToAdd);

      const [hours, minutes] = (program.time || '10:00').split(':').map(Number);
      date.setHours(hours, minutes, 0, 0);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
  }

  // For monthly: use first of next month
  const date = new Date(now);
  date.setMonth(date.getMonth() + 1, 1);
  const [hours, minutes] = (program.time || '10:00').split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n')
    .substring(0, 150); // Limit length
}
