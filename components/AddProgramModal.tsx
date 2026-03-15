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
    icon: '✨',
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
      icon: formData.icon,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sticky top-0 bg-white border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Add {category === 'daily' ? 'Daily' : category === 'weekly' ? 'Weekly' : 'Monthly'} Program
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Program title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => updateField('icon', e.target.value)}
              placeholder="✨"
              maxLength={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Optional description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Daily Specific */}
          {category === 'daily' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Platform *</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => updateField('platform', e.target.value)}
                  placeholder="Zoom / Google Meet"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => updateField('link', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Weekly & Monthly Common */}
          {(category === 'weekly' || category === 'monthly') && (
            <>
              {category === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => updateField('day', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-medium text-gray-900 mb-1">Occurrence</label>
                  <select
                    value={formData.occurrence}
                    onChange={(e) => updateField('occurrence', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-900 mb-1">Time</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => updateField('time', e.target.value)}
                  placeholder="7:00 PM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => updateField('venue', e.target.value)}
                  placeholder="Location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Monthly Specific */}
          {category === 'monthly' && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Note</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => updateField('note', e.target.value)}
                placeholder="E.g., For Teens"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Time field for daily */}
          {category === 'daily' && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => updateField('time', e.target.value)}
                placeholder="9:30 PM IST"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
