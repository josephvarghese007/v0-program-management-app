'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/types';

interface AddProgramModalProps {
  category: 'daily' | 'weekly' | 'monthly';
  onSave: (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export function AddProgramModal({ category, onSave, onClose }: AddProgramModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    icon: 'auto_awesome',
    description: '',
    platform: '',
    link: '',
    day: '',
    time: '',
    occurrence: '',
    venue: '',
    note: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    const baseProgram = {
      title: formData.title.trim(),
      icon: formData.icon.trim(),
      category,
      type: category === 'daily' ? 'online' : 'offline',
      description: formData.description || undefined,
    };

    if (category === 'daily') {
      if (!formData.platform.trim()) {
        setError('Platform is required for daily programs');
        return;
      }
      onSave({
        ...baseProgram,
        platform: formData.platform.trim(),
        link: formData.link.trim(),
        time: formData.time.trim(),
        type: 'online',
      });
    } else if (category === 'weekly') {
      onSave({
        ...baseProgram,
        day: formData.day.trim() || 'Various',
        time: formData.time.trim(),
        venue: formData.venue.trim(),
        type: 'offline',
      });
    } else {
      onSave({
        ...baseProgram,
        occurrence: formData.occurrence.trim() || 'Monthly',
        time: formData.time.trim(),
        venue: formData.venue.trim(),
        note: formData.note.trim() || undefined,
        type: 'offline',
      });
    }

    onClose();
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-background/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="glass-panel rounded-t-2xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 sticky top-0 bg-card/90 border-b border-border/60 backdrop-blur-md z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            Add {category === 'daily' ? 'Daily' : category === 'weekly' ? 'Weekly' : 'Monthly'} Program
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Tip: Use a Material icon name like "auto_awesome".
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Program title"
              className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => updateField('icon', e.target.value)}
              placeholder="auto_awesome"
              maxLength={24}
              className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Optional description"
              rows={2}
              className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {category === 'daily' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Platform *</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => updateField('platform', e.target.value)}
                  placeholder="Zoom / Google Meet"
                  className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => updateField('link', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </>
          )}

          {(category === 'weekly' || category === 'monthly') && (
            <>
              {category === 'weekly' && (
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => updateField('day', e.target.value)}
                    className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Select a day</option>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Various'].map(
                      (day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {category === 'monthly' && (
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1">Occurrence</label>
                  <select
                    value={formData.occurrence}
                    onChange={(e) => updateField('occurrence', e.target.value)}
                    className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="First Sundays">First Sundays</option>
                    <option value="Second Saturdays">Second Saturdays</option>
                    <option value="Third Saturdays">Third Saturdays</option>
                    <option value="Last Sundays">Last Sundays</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Time</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => updateField('time', e.target.value)}
                  placeholder="7:00 PM"
                  className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => updateField('venue', e.target.value)}
                  placeholder="Location"
                  className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </>
          )}

          {category === 'monthly' && (
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Note</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => updateField('note', e.target.value)}
                placeholder="E.g., For Teens"
                className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          )}

          {category === 'daily' && (
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => updateField('time', e.target.value)}
                placeholder="9:30 PM IST"
                className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          )}

          {error && <div className="text-destructive text-sm font-semibold">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border/60 text-foreground rounded-lg hover:bg-muted/40 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition font-semibold"
            >
              Add Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
