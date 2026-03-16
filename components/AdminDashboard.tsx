'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/types';
import { useApp } from '@/lib/context';
import { ProgramIcon } from './ProgramIcon';

interface AdminDashboardProps {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: (id: string) => void;
  onAddProgram: (category: 'daily' | 'weekly' | 'monthly') => void;
  onClose: () => void;
}

export function AdminDashboard({
  programs,
  onEdit,
  onDelete,
  onAddProgram,
  onClose,
}: AdminDashboardProps) {
  const { registrations } = useApp();
  const [filterCategory, setFilterCategory] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter((p) => {
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: programs.length,
    daily: programs.filter((p) => p.category === 'daily').length,
    weekly: programs.filter((p) => p.category === 'weekly').length,
    monthly: programs.filter((p) => p.category === 'monthly').length,
    registrations: registrations.length,
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      onDelete(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold"
        >
          <span className="material-symbols-rounded text-lg">arrow_back</span>
          Back to Programs
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all programs and monitor registrations.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            {
              label: 'Total Programs',
              value: stats.total,
              icon: 'analytics',
              tone: 'text-primary border-primary/30 bg-primary/10',
            },
            {
              label: 'Daily',
              value: stats.daily,
              icon: 'volunteer_activism',
              tone: 'text-secondary border-secondary/30 bg-secondary/10',
            },
            {
              label: 'Weekly',
              value: stats.weekly,
              icon: 'calendar_month',
              tone: 'text-accent border-accent/30 bg-accent/10',
            },
            {
              label: 'Monthly',
              value: stats.monthly,
              icon: 'celebration',
              tone: 'text-primary border-primary/30 bg-primary/10',
            },
            {
              label: 'Registrations',
              value: stats.registrations,
              icon: 'groups',
              tone: 'text-secondary border-secondary/30 bg-secondary/10',
            },
          ].map((stat) => (
            <div key={stat.label} className={`border rounded-2xl p-4 text-center ${stat.tone}`}>
              <span className="material-symbols-rounded text-2xl mb-2 inline-flex">{stat.icon}</span>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="text-xs font-semibold opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-2xl p-4 mb-6">
          <h2 className="font-semibold text-foreground mb-3">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAddProgram('daily')}
              className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition font-semibold border border-primary/30"
            >
              Add Daily Program
            </button>
            <button
              onClick={() => onAddProgram('weekly')}
              className="px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition font-semibold border border-secondary/30"
            >
              Add Weekly Program
            </button>
            <button
              onClick={() => onAddProgram('monthly')}
              className="px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition font-semibold border border-accent/30"
            >
              Add Monthly Program
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..."
                className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
                className="px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="all">All Categories</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/60">
            <h2 className="font-semibold text-foreground">Programs ({filteredPrograms.length})</h2>
          </div>

          {filteredPrograms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/40 border-b border-border/60">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Details</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((program) => (
                    <tr key={program.id} className="border-b border-border/40 hover:bg-muted/20 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <ProgramIcon icon={program.icon} className="text-lg text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{program.title}</p>
                            {program.description && (
                              <p className="text-sm text-muted-foreground truncate max-w-xs">
                                {program.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-card/60 text-foreground rounded text-sm font-semibold capitalize border border-border/60">
                          {program.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm font-semibold capitalize border ${
                            program.type === 'online'
                              ? 'bg-primary/10 text-primary border-primary/30'
                              : 'bg-secondary/10 text-secondary border-secondary/30'
                          }`}
                        >
                          {program.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {program.category === 'daily' && program.platform && <div>{program.platform}</div>}
                        {program.day && (
                          <div>
                            {program.day} at {program.time}
                          </div>
                        )}
                        {program.occurrence && <div>{program.occurrence}</div>}
                        {program.venue && <div className="truncate max-w-xs">{program.venue}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onEdit(program)}
                            className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition text-sm font-semibold border border-primary/30"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(program.id, program.title)}
                            className="px-3 py-1.5 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition text-sm font-semibold border border-destructive/30"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-muted-foreground">
              <p>No programs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
