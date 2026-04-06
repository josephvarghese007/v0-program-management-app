'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { motion } from 'framer-motion';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup' | 'admin'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser, loginAsAdmin } = useApp();

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (tab === 'signup' && !name) {
      setError('Name is required for signup');
      return;
    }

    try {
      if (tab === 'login') {
        await loginUser(email, email.split('@')[0], phone);
      } else {
        await loginUser(email, name, phone);
      }
      onClose();
    } catch (err) {
      setError('Failed to login');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!adminPassword) {
      setError('Password is required');
      return;
    }

    if (loginAsAdmin(adminPassword)) {
      onClose();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="fixed inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-card w-full max-w-md rounded-3xl shadow-2xl border border-border/60 overflow-hidden"
      >
        <div className="flex border-b border-border/60 bg-muted/30 p-1">
          {[
            { id: 'login', label: 'Login', icon: 'login' },
            { id: 'signup', label: 'Sign Up', icon: 'auto_awesome' },
            { id: 'admin', label: 'Admin', icon: 'admin_panel_settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id as typeof tab);
                setError('');
              }}
              className={`flex-1 py-3 text-sm font-semibold text-center transition-all rounded-2xl mx-1 flex items-center justify-center gap-2 ${
                tab === item.id
                  ? 'text-primary bg-background shadow-sm border border-border/60'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <span className="material-symbols-rounded text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {tab === 'admin' ? (
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-muted-foreground mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              {error && <div className="text-destructive text-sm mb-4">{error}</div>}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Login as Admin
              </button>
            </form>
          ) : (
            <form onSubmit={handleUserLogin}>
              <div className="space-y-4">
                {tab === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-border/60 rounded-lg bg-card/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              {error && <div className="text-destructive text-sm mt-4">{error}</div>}

              <div className="flex gap-3 mt-6">
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
                  {tab === 'signup' ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>
          )}

          {tab === 'login' && (
            <button
              onClick={() => setTab('signup')}
              className="w-full mt-4 text-primary hover:underline text-sm font-semibold"
            >
              Don't have an account? Sign up
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
