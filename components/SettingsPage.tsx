'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { NotificationPreferences } from './NotificationPreferences';
import { UserRegistrations } from './UserRegistrations';
import { Program } from '@/lib/types';

interface SettingsPageProps {
  onClose: () => void;
  programs?: Program[];
}

export function SettingsPage({ onClose, programs = [] }: SettingsPageProps) {
  const { currentUser, logoutUser } = useApp();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logoutUser();
      onClose();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={onClose}
            className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div className="text-center py-12">
            <p className="text-gray-600">Please log in to access settings</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Back
        </button>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {currentUser.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {currentUser.email}
                </p>
              </div>

              {currentUser.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {currentUser.phone}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* My Registrations */}
          <UserRegistrations programs={programs} />

          {/* Notification Preferences */}
          <NotificationPreferences />

          {/* Account Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account</h3>

            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium border border-red-200"
              >
                Logout
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your data is stored locally on this device
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Support</h3>
            <p className="text-blue-800 mb-4">
              For help or questions about Jesus Youth programs, visit our main website:
            </p>
            <a
              href="https://www.jesusyouth.org"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Visit jesusyouth.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
