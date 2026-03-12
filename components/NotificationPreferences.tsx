'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';

export function NotificationPreferences() {
  const { currentUser, updateSubscription } = useApp();
  const [preferences, setPreferences] = useState({
    programCategory: 'all',
    enableEmail: true,
    enableSMS: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    // In a real app, fetch from backend
    const stored = localStorage.getItem(`notifications_${currentUser.id}`);
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, [currentUser]);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...preferences, [field]: value };
    setPreferences(updated);
    
    if (currentUser) {
      updateSubscription(updated);
      localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updated));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-700">
        Please log in to manage notification preferences
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Preferences</h3>

      <div className="space-y-4">
        {/* Program Category */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Get notifications for:
          </label>
          <select
            value={preferences.programCategory}
            onChange={(e) => handleUpdate('programCategory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Programs</option>
            <option value="daily">Daily Prayers Only</option>
            <option value="weekly">Weekly Meetings Only</option>
            <option value="monthly">Monthly Events Only</option>
          </select>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div>
            <label className="font-medium text-gray-900">Email Notifications</label>
            <p className="text-sm text-gray-600">Get reminders via email</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.enableEmail}
            onChange={(e) => handleUpdate('enableEmail', e.target.checked)}
            className="w-5 h-5 text-blue-600 cursor-pointer"
          />
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div>
            <label className="font-medium text-gray-900">SMS Notifications</label>
            <p className="text-sm text-gray-600">Get reminders via text message</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.enableSMS}
            onChange={(e) => handleUpdate('enableSMS', e.target.checked)}
            className="w-5 h-5 text-blue-600 cursor-pointer"
            disabled
            title="SMS notifications require backend integration"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        <p className="font-medium mb-1">How notifications work:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Email reminders are sent 24 hours before events</li>
          <li>Customize which programs you want to hear about</li>
          <li>Your phone number is only used for SMS if enabled</li>
        </ul>
      </div>

      {saved && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
          Preferences saved successfully
        </div>
      )}
    </div>
  );
}
