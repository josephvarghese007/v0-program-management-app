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
    <div className="fixed inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-panel rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sticky top-0 bg-card/90 border-b border-border/60">
          <h2 className="text-xl font-semibold text-foreground">Edit Program</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {editableFields.map((field) => {
            const value = formData[field] || '';
            const displayField =
              field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');

            if (field === 'icon') {
              return (
                <div key={field}>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1">
                    {displayField}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateField(field, e.target.value)}
                    maxLength={24}
                    className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              );
            }

            if (field === 'description') {
              return (
                <div key={field}>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1">
                    {displayField}
                  </label>
                  <textarea
                    value={value}
                    onChange={(e) => updateField(field, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              );
            }

            return (
              <div key={field}>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">
                  {displayField}
                </label>
                <input
                  type={field === 'link' ? 'url' : 'text'}
                  value={value}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            );
          })}

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
