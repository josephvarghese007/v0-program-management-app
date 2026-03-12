'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/types';
import { useApp } from '@/lib/context';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Back to Programs
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all programs and monitor registrations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total Programs', value: stats.total, icon: '📋', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Daily', value: stats.daily, icon: '☀️', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
            { label: 'Weekly', value: stats.weekly, icon: '📅', color: 'bg-green-50 text-green-700 border-green-200' },
            { label: 'Monthly', value: stats.monthly, icon: '🗓️', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { label: 'Registrations', value: stats.registrations, icon: '👥', color: 'bg-pink-50 text-pink-700 border-pink-200' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`border rounded-lg p-4 text-center ${stat.color}`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs font-medium opacity-75">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add Program Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAddProgram('daily')}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg transition font-medium border border-yellow-300"
            >
              + Add Daily Program
            </button>
            <button
              onClick={() => onAddProgram('weekly')}
              className="px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition font-medium border border-green-300"
            >
              + Add Weekly Program
            </button>
            <button
              onClick={() => onAddProgram('monthly')}
              className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition font-medium border border-purple-300"
            >
              + Add Monthly Program
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Programs List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              Programs ({filteredPrograms.length})
            </h2>
          </div>

          {filteredPrograms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Details</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((program) => (
                    <tr key={program.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{program.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">{program.title}</p>
                            {program.description && (
                              <p className="text-sm text-gray-600 truncate max-w-xs">
                                {program.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium capitalize">
                          {program.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 rounded text-sm font-medium capitalize ${
                          program.type === 'online'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {program.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {program.category === 'daily' && program.platform && (
                          <div>{program.platform}</div>
                        )}
                        {program.day && <div>{program.day} at {program.time}</div>}
                        {program.occurrence && <div>{program.occurrence}</div>}
                        {program.venue && <div className="truncate max-w-xs">{program.venue}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onEdit(program)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(program.id, program.title)}
                            className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded transition text-sm font-medium"
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
            <div className="px-6 py-12 text-center text-gray-500">
              <p>No programs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
