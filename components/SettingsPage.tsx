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
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={onClose}
            className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold"
          >
            <span className="material-symbols-rounded text-lg">arrow_back</span>
            Back
          </button>
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">Please log in to access settings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold"
        >
          <span className="material-symbols-rounded text-lg">arrow_back</span>
          Back to Programs
        </button>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Profile Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Name</label>
                <p className="px-3 py-2 bg-card/60 border border-border/60 rounded-lg text-foreground">
                  {currentUser.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Email</label>
                <p className="px-3 py-2 bg-card/60 border border-border/60 rounded-lg text-foreground">
                  {currentUser.email}
                </p>
              </div>

              {currentUser.phone && (
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1">Phone</label>
                  <p className="px-3 py-2 bg-card/60 border border-border/60 rounded-lg text-foreground">
                    {currentUser.phone}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1">Member Since</label>
                <p className="px-3 py-2 bg-card/60 border border-border/60 rounded-lg text-foreground">
                  {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <UserRegistrations programs={programs} />

          <NotificationPreferences />

          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account</h3>

            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition font-semibold border border-destructive/30"
              >
                Logout
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Your data is stored locally on this device.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Support</h3>
            <p className="text-muted-foreground mb-4">
              For help or questions about Jesus Youth programs, visit our main website.
            </p>
            <a
              href="https://www.jesusyouth.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition font-semibold"
            >
              Visit jesusyouth.org
              <span className="material-symbols-rounded text-lg">arrow_outward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
