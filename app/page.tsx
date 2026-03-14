'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
import { HeroSection } from '@/components/HeroSection';
import { TabNavigation } from '@/components/TabNavigation';

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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {currentPage === 'main' && (
        <header className="bg-gradient-to-r from-primary to-accent text-white sticky top-0 z-40 shadow-lg border-b border-primary/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">✝️ Jesus Youth</h1>
              <p className="text-white/80 text-sm font-medium">Angamaly Zone</p>
            </div>

            <div className="flex items-center gap-3">
              <ExportMenu programs={programs} />

              {currentUser && (
                <div className="text-right text-sm">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-white/80 text-xs">{currentUser.email}</p>
                </div>
              )}

              {isAdmin && (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="px-3 py-1.5 bg-white/20 text-white hover:bg-white/30 rounded-lg text-sm font-semibold transition"
                  title="Admin Dashboard"
                >
                  👑 Admin
                </button>
              )}

              {currentUser && (
                <button
                  onClick={() => setCurrentPage('settings')}
                  className="px-3 py-1.5 bg-white/20 text-white hover:bg-white/30 rounded-lg transition font-medium"
                  title="Settings"
                >
                  ⚙️
                </button>
              )}

              {currentUser ? (
                <button
                  onClick={logoutUser}
                  className="px-4 py-2 bg-white/20 text-white hover:bg-white/30 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-white text-primary hover:bg-gray-100 rounded-lg transition font-semibold"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Admin Dashboard */}
      {currentPage === 'admin' && (
        <AdminDashboard
          programs={programs}
          onEdit={setEditingProgram}
          onDelete={handleDeleteProgram}
          onAddProgram={handleAddProgram}
          onClose={() => setCurrentPage('main')}
        />
      )}

      {/* Settings Page */}
      {currentPage === 'settings' && (
        <SettingsPage onClose={() => setCurrentPage('main')} programs={programs} />
      )}

      {/* Main Content */}
      {currentPage === 'main' && (
        <>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
            {/* Admin Add Buttons */}
            {isAdmin && (
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAddProgram('daily')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition font-semibold"
                >
                  + Add Daily Program
                </button>
                <button
                  onClick={() => handleAddProgram('weekly')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition font-semibold"
                >
                  + Add Weekly Program
                </button>
                <button
                  onClick={() => handleAddProgram('monthly')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition font-semibold"
                >
                  + Add Monthly Program
                </button>
              </div>
            )}

            {/* Home Tab */}
            {activeTab === 'home' && (
              <div className="space-y-8">
                <HeroSection 
                  upcomingPrograms={programs}
                  onTabChange={setActiveTab}
                  currentUser={currentUser}
                />

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Upcoming Daily Prayers</h3>
                  <ProgramList
                    programs={programs}
                    category="daily"
                    registeredProgramIds={registeredProgramIds}
                    onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
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
                onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
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
                onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
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
                onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
              />
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <CalendarView
                programs={programs}
                registeredProgramIds={registeredProgramIds}
                onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
                currentUser={currentUser}
              />
            )}
          </main>

          {/* Footer */}
          <footer className="bg-gradient-to-r from-primary to-accent text-white py-8 mt-16 w-full">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Jesus Youth</h4>
                  <p className="text-white/80 text-sm">Growing together in faith and community</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Programs</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>Daily Prayers</li>
                    <li>Weekly Meetings</li>
                    <li>Monthly Events</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Connect</h4>
                  <a href="https://www.jesusyouth.org" target="_blank" rel="noreferrer" className="text-white/80 text-sm hover:text-white transition">
                    Visit jesusyouth.org
                  </a>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4 text-center text-white/70 text-xs">
                © 2024 Jesus Youth Angamaly Zone. Building community through faith.
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {showAddModal && (
        <AddProgramModal
          category={addCategory}
          onSave={handleSaveProgram}
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
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-in fade-in duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
