'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { Subscription } from '@/lib/types';

export function NotificationPreferences() {
  const { currentUser, updateSubscription } = useApp();
  const [preferences, setPreferences] = useState<
    Pick<Subscription, 'programCategory' | 'enableEmail' | 'enableSMS'>
  >({
    programCategory: 'all',
    enableEmail: true,
    enableSMS: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const stored = localStorage.getItem(`notifications_${currentUser.id}`);
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, [currentUser]);

  const handleUpdate = <K extends keyof typeof preferences>(field: K, value: (typeof preferences)[K]) => {
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
      <div className="glass-panel rounded-2xl p-4 text-center text-muted-foreground">
        Please log in to manage notification preferences.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            Get notifications for:
          </label>
          <select
            value={preferences.programCategory}
            onChange={(e) => handleUpdate('programCategory', e.target.value as Subscription['programCategory'])}
            className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">All Programs</option>
            <option value="daily">Daily Prayers Only</option>
            <option value="weekly">Weekly Meetings Only</option>
            <option value="monthly">Monthly Events Only</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 border border-border/60 rounded-2xl bg-card/60">
          <div>
            <label className="font-semibold text-foreground">Email Notifications</label>
            <p className="text-sm text-muted-foreground">Get reminders via email.</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.enableEmail}
            onChange={(e) => handleUpdate('enableEmail', e.target.checked)}
            className="w-5 h-5 text-primary cursor-pointer accent-primary"
          />
        </div>

        <div className="flex items-center justify-between p-3 border border-border/60 rounded-2xl bg-card/60">
          <div>
            <label className="font-semibold text-foreground">SMS Notifications</label>
            <p className="text-sm text-muted-foreground">Get reminders via text message.</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.enableSMS}
            onChange={(e) => handleUpdate('enableSMS', e.target.checked)}
            className="w-5 h-5 text-primary cursor-pointer accent-primary"
            disabled
            title="SMS notifications require backend integration"
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted/40 border border-border/60 rounded-2xl text-sm text-muted-foreground">
        <p className="font-semibold mb-1 text-foreground">How notifications work:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Email reminders are sent 24 hours before events.</li>
          <li>Customize which programs you want to hear about.</li>
          <li>Your phone number is only used for SMS if enabled.</li>
        </ul>
      </div>

      {saved && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary font-semibold">
          Preferences saved successfully.
        </div>
      )}
    </div>
  );
}
