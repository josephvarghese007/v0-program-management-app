'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/types';

interface EditProgramModalProps {
  program: Program;
  onSave: (updates: Partial<Program>) => void;
  onClose: () => void;
}

export function EditProgramModal({ program, onSave, onClose }: EditProgramModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(program);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }

    onSave(formData);
    onClose();
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const editableFields = Object.keys(program).filter(
    (key) => !['id', 'createdAt', 'updatedAt', 'category', 'type'].includes(key)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sticky top-0 bg-white border-b">
          <h2 className="text-xl font-bold text-gray-900">Edit Program</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {editableFields.map((field) => {
            const value = formData[field] || '';
            const displayField =
              field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');

            if (field === 'icon') {
              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-900 mb-1">{displayField}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateField(field, e.target.value)}
                    maxLength={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            }

            if (field === 'description') {
              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-900 mb-1">{displayField}</label>
                  <textarea
                    value={value}
                    onChange={(e) => updateField(field, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            }

            return (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-900 mb-1">{displayField}</label>
                <input
                  type={field === 'link' ? 'url' : 'text'}
                  value={value}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            );
          })}

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
