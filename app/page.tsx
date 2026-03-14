'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import { Program } from '@/lib/types';
import { ProgramList } from '@/components/ProgramList';
import { CalendarView } from '@/components/CalendarView';
import { AuthModal } from '@/components/AuthModal';
import { AddProgramModal } from '@/components/AddProgramModal';
import { EditProgramModal } from '@/components/EditProgramModal';
import { AdminDashboard } from '@/components/AdminDashboard';
import { SettingsPage } from '@/components/SettingsPage';
import { ExportMenu } from '@/components/ExportMenu';

export default function Home() {
  const {
    programs,
    currentUser,
    isAdmin,
    registrations,
    addProgram,
    updateProgram,
    deleteProgram,
    logoutUser,
    registerForProgram,
    unregisterFromProgram,
    isRegisteredForProgram,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'home' | 'daily' | 'weekly' | 'monthly' | 'calendar'>('home');
  const [currentPage, setCurrentPage] = useState<'main' | 'admin' | 'settings'>('main');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addCategory, setAddCategory] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const registeredProgramIds = useMemo(
    () => registrations.map((r) => r.programId),
    [registrations]
  );

  const handleAddProgram = (category: 'daily' | 'weekly' | 'monthly') => {
    setAddCategory(category);
    setShowAddModal(true);
  };

  const handleSaveProgram = (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => {
    addProgram(program);
    showToast('Program added successfully!');
  };

  const handleEditProgram = (updates: Partial<Program>) => {
    if (editingProgram) {
      updateProgram(editingProgram.id, updates);
      showToast('Program updated successfully!');
    }
  };

  const handleDeleteProgram = (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      deleteProgram(id);
      showToast('Program deleted.');
    }
  };

  const handleToggleRegistration = (programId: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (isRegisteredForProgram(programId)) {
      unregisterFromProgram(programId);
      showToast('Registration cancelled.');
    } else {
      registerForProgram(programId);
      showToast('You are now registered!');
    }
  };

  // Admin Dashboard Page
  if (currentPage === 'admin') {
    return (
      <AdminDashboard
        programs={programs}
        onEdit={setEditingProgram}
        onDelete={handleDeleteProgram}
        onAddProgram={handleAddProgram}
        onClose={() => setCurrentPage('main')}
      />
    );
  }

  // Settings Page
  if (currentPage === 'settings') {
    return (
      <SettingsPage onClose={() => setCurrentPage('main')} programs={programs} />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">JY</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Jesus Youth</h1>
              <p className="text-xs text-slate-500">Angamaly Zone</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ExportMenu programs={programs} />
            
            {isAdmin && (
              <button
                onClick={() => setCurrentPage('admin')}
                className="px-4 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition font-semibold text-sm border border-amber-200"
              >
                Admin
              </button>
            )}

            {currentUser && (
              <button
                onClick={() => setCurrentPage('settings')}
                className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-600"
                title="Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
                <button
                  onClick={logoutUser}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg rounded-lg transition font-semibold text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'daily', label: 'Daily Prayers', icon: '🙏' },
            { id: 'weekly', label: 'Weekly Meetings', icon: '📅' },
            { id: 'monthly', label: 'Monthly Events', icon: '🎉' },
            { id: 'calendar', label: 'Calendar', icon: '📆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white shadow-lg">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Jesus Youth</h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">Join our vibrant faith community for daily prayers, weekly fellowship, and monthly celebrations. Connect with others who share your passion for faith and service.</p>
                {!currentUser && (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-8 py-3 bg-white text-indigo-600 hover:bg-blue-50 rounded-lg font-semibold transition shadow-md"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { count: programs.filter(p => p.category === 'daily').length, label: 'Daily Prayers', emoji: '🙏', color: 'from-blue-100 to-blue-50' },
                { count: programs.filter(p => p.category === 'weekly').length, label: 'Weekly Meetings', emoji: '📅', color: 'from-indigo-100 to-indigo-50' },
                { count: programs.filter(p => p.category === 'monthly').length, label: 'Monthly Events', emoji: '🎉', color: 'from-purple-100 to-purple-50' },
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 border border-slate-200 hover:shadow-md transition`}>
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <div className="text-4xl font-bold text-slate-900 mb-1">{stat.count}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Programs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Featured Programs</h3>
                {isAdmin && (
                  <button
                    onClick={() => handleAddProgram('daily')}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition font-medium text-sm"
                  >
                    Add Program
                  </button>
                )}
              </div>
              <ProgramList
                programs={programs.slice(0, 4)}
                category="daily"
                isAdmin={isAdmin}
                onEdit={setEditingProgram}
                onDelete={handleDeleteProgram}
                registeredProgramIds={registeredProgramIds}
                onToggleRegistration={handleToggleRegistration}
              />
            </div>
          </div>
        )}

        {/* Daily Tab */}
        {activeTab === 'daily' && (
          <ProgramList
            programs={programs}
            category="daily"
            isAdmin={isAdmin}
            onEdit={setEditingProgram}
            onDelete={handleDeleteProgram}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={handleToggleRegistration}
          />
        )}

        {/* Weekly Tab */}
        {activeTab === 'weekly' && (
          <ProgramList
            programs={programs}
            category="weekly"
            isAdmin={isAdmin}
            onEdit={setEditingProgram}
            onDelete={handleDeleteProgram}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={handleToggleRegistration}
          />
        )}

        {/* Monthly Tab */}
        {activeTab === 'monthly' && (
          <ProgramList
            programs={programs}
            category="monthly"
            isAdmin={isAdmin}
            onEdit={setEditingProgram}
            onDelete={handleDeleteProgram}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={handleToggleRegistration}
          />
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <CalendarView
            programs={programs}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={handleToggleRegistration}
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Jesus Youth Angamaly</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Building a vibrant faith community through prayer, fellowship, and service to our neighbors.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Events</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Get In Touch</h4>
              <p className="text-sm text-slate-400">Email: <a href="mailto:contact@jesusyouth.org" className="text-blue-400 hover:text-blue-300">contact@jesusyouth.org</a></p>
              <p className="text-sm text-slate-400 mt-2">Website: <a href="https://www.jesusyouth.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">jesusyouth.org</a></p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>© 2024 Jesus Youth Angamaly Zone. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {showAddModal && (
        <AddProgramModal
          category={addCategory}
          onAdd={handleSaveProgram}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingProgram && (
        <EditProgramModal
          program={editingProgram}
          onSave={handleEditProgram}
          onClose={() => setEditingProgram(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-2 fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
