'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/types';
import { exportProgramsToJSON, exportProgramsToCSV, exportProgramsToICalendar } from '@/lib/export';

interface ExportMenuProps {
  programs: Program[];
}

export function ExportMenu({ programs }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: 'json' | 'csv' | 'ical') => {
    try {
      if (format === 'json') {
        exportProgramsToJSON(programs);
      } else if (format === 'csv') {
        exportProgramsToCSV(programs);
      } else if (format === 'ical') {
        exportProgramsToICalendar(programs);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 text-sm bg-card/60 text-foreground hover:bg-muted/40 rounded-lg transition flex items-center gap-2 border border-border/60"
        title="Export programs"
      >
        <span className="material-symbols-rounded text-base">download</span>
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-card/90 border border-border/60 rounded-2xl shadow-lg z-10 overflow-hidden">
          <button
            onClick={() => handleExport('ical')}
            className="w-full text-left px-4 py-3 hover:bg-muted/40 border-b border-border/60 flex items-center gap-3"
          >
            <span className="material-symbols-rounded text-lg text-secondary">event</span>
            <div>
              <div className="font-semibold text-foreground">iCalendar (.ics)</div>
              <div className="text-xs text-muted-foreground">Import to calendar apps</div>
            </div>
          </button>

          <button
            onClick={() => handleExport('csv')}
            className="w-full text-left px-4 py-3 hover:bg-muted/40 border-b border-border/60 flex items-center gap-3"
          >
            <span className="material-symbols-rounded text-lg text-primary">table</span>
            <div>
              <div className="font-semibold text-foreground">CSV (.csv)</div>
              <div className="text-xs text-muted-foreground">Open in Excel or Sheets</div>
            </div>
          </button>

          <button
            onClick={() => handleExport('json')}
            className="w-full text-left px-4 py-3 hover:bg-muted/40 flex items-center gap-3"
          >
            <span className="material-symbols-rounded text-lg text-accent">code</span>
            <div>
              <div className="font-semibold text-foreground">JSON (.json)</div>
              <div className="text-xs text-muted-foreground">Full data backup</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
