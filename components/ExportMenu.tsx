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
        className="px-3 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition flex items-center gap-2"
        title="Export programs"
      >
        <span>📥</span>
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => handleExport('ical')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2"
          >
            <span>📅</span>
            <div>
              <div className="font-medium text-gray-900">iCalendar (.ics)</div>
              <div className="text-xs text-gray-600">Import to calendar apps</div>
            </div>
          </button>

          <button
            onClick={() => handleExport('csv')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2"
          >
            <span>📊</span>
            <div>
              <div className="font-medium text-gray-900">CSV (.csv)</div>
              <div className="text-xs text-gray-600">Open in Excel or Sheets</div>
            </div>
          </button>

          <button
            onClick={() => handleExport('json')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
          >
            <span>⚙️</span>
            <div>
              <div className="font-medium text-gray-900">JSON (.json)</div>
              <div className="text-xs text-gray-600">Full data backup</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
