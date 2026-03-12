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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      {currentPage === 'main' && (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Jesus Youth</h1>
              <p className="text-blue-100 text-sm">Angamaly Zone Programs</p>
            </div>

            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="text-right text-sm">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-blue-100 text-xs">{currentUser.email}</p>
                </div>
              )}

              <ExportMenu programs={programs} />

              {isAdmin && (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="px-3 py-1 bg-yellow-400 text-yellow-900 hover:bg-yellow-300 rounded-full text-sm font-semibold transition"
                  title="Admin Dashboard"
                >
                  Admin
                </button>
              )}

              {currentUser && (
                <button
                  onClick={() => setCurrentPage('settings')}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition"
                  title="Settings"
                >
                  ⚙️
                </button>
              )}

              {currentUser ? (
                <button
                  onClick={logoutUser}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      {currentPage === 'admin' && (
        <AdminDashboard
          programs={programs}
          onEdit={setEditingProgram}
          onDelete={handleDeleteProgram}
          onAddProgram={handleAddProgram}
          onClose={() => setCurrentPage('main')}
        />
      )}

      {currentPage === 'settings' && (
        <SettingsPage onClose={() => setCurrentPage('main')} programs={programs} />
      )}

      {currentPage === 'main' && (
        <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-4 border-b border-gray-200">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'daily', label: 'Daily', icon: '☀️' },
            { id: 'weekly', label: 'Weekly', icon: '📅' },
            { id: 'monthly', label: 'Monthly', icon: '🗓️' },
            { id: 'calendar', label: 'Calendar', icon: '📆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => handleAddProgram('daily')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              + Add Daily Program
            </button>
            <button
              onClick={() => handleAddProgram('weekly')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              + Add Weekly Program
            </button>
            <button
              onClick={() => handleAddProgram('monthly')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              + Add Monthly Program
            </button>
          </div>
        )}

        {/* Content Sections */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">✝️</div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Jesus Youth</h2>
              <p className="text-blue-100">Join our community for daily prayers, weekly meetings, and monthly events</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '🙏', label: 'Daily Programs', count: programs.filter((p) => p.category === 'daily').length, tab: 'daily' },
                { icon: '📅', label: 'Weekly Programs', count: programs.filter((p) => p.category === 'weekly').length, tab: 'weekly' },
                { icon: '🗓️', label: 'Monthly Programs', count: programs.filter((p) => p.category === 'monthly').length, tab: 'monthly' },
              ].map((stat) => (
                <button
                  key={stat.tab}
                  onClick={() => setActiveTab(stat.tab as typeof activeTab)}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-600">{stat.count}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </button>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Daily Prayers</h3>
              <ProgramList
                programs={programs}
                category="daily"
                registeredProgramIds={registeredProgramIds}
                onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
              />
            </div>
          </div>
        )}

        {activeTab === 'daily' && (
          <ProgramList
            programs={programs}
            category="daily"
            isAdmin={isAdmin}
            onEdit={setEditingProgram}
            onDelete={handleDeleteProgram}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
          />
        )}

        {activeTab === 'weekly' && (
          <ProgramList
            programs={programs}
            category="weekly"
            isAdmin={isAdmin}
            onEdit={setEditingProgram}
            onDelete={handleDeleteProgram}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
          />
        )}

        {activeTab === 'monthly' && (
          <ProgramList
            programs={programs}
            category="monthly"
            isAdmin={isAdmin}
            onEdit={setEditingProgram}
            onDelete={handleDeleteProgram}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            programs={programs}
            registeredProgramIds={registeredProgramIds}
            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
            currentUser={currentUser}
          />
        )}
        </main>
      )}

      {/* Footer */}
      {currentPage === 'main' && (
        <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p className="mb-2">Jesus Youth - Angamaly Zone</p>
          <p>Visit us: <a href="https://www.jesusyouth.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">jesusyouth.org</a></p>
          <p className="text-gray-500 mt-4">© 2024 All rights reserved</p>
        </div>
      </footer>
      )}

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

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
