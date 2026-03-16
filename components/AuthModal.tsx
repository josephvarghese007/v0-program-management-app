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
    <div className="fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-card w-full max-w-md rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-border/50 bg-muted/30 p-1">
          {['login', 'signup', 'admin'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t as typeof tab);
                setError('');
              }}
              className={`flex-1 py-3 text-sm font-bold text-center transition-all rounded-t-2xl rounded-b-md mx-1 ${
                tab === t
                  ? 'text-primary bg-background shadow-sm border border-border/50 border-b-0'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              {t === 'admin' ? '👑 Admin' : t === 'signup' ? '✨ Sign Up' : '🔓 Login'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {tab === 'admin' ? (
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Login as Admin
              </button>
            </form>
          ) : (
            <form onSubmit={handleUserLogin}>
              <div className="space-y-4">
                {tab === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

              <div className="flex gap-3 mt-6">
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
                  {tab === 'signup' ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>
          )}

          {tab === 'login' && (
            <button
              onClick={() => setTab('signup')}
              className="w-full mt-4 text-primary hover:underline text-sm font-bold"
            >
              Don't have an account? Sign up
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
