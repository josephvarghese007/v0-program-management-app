'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { Program } from '@/lib/types';
import { ProgramList } from '@/components/sections/ProgramList';
import { CalendarView } from '@/components/sections/CalendarView';
import { AuthModal } from '@/components/modals/AuthModal';
import { AddProgramModal } from '@/components/modals/AddProgramModal';
import { EditProgramModal } from '@/components/modals/EditProgramModal';
import { AdminDashboard } from '@/components/sections/AdminDashboard';
import { SettingsPage } from '@/components/sections/SettingsPage';
import { HeroSection } from '@/components/sections/HeroSection';
import { BottomNav, NavTab } from '@/components/layout/BottomNav';
import { ReflectionsView } from '@/components/sections/ReflectionsView';
import { motion, AnimatePresence } from 'framer-motion';

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

  const [activeTab, setActiveTab] = useState<NavTab>('home');
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
      {/* Top spacing for status bar in PWA */}
      <div className="h-safe pt-2"></div>

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

          <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-10 pb-20 sm:pb-28">
            {/* Admin Add Buttons */}
            {isAdmin && (
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAddProgram('daily')}
                  className="px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition font-semibold"
                >
                  + Add Daily Program
                </button>
                <button
                  onClick={() => handleAddProgram('weekly')}
                  className="px-4 py-2 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20 transition font-semibold"
                >
                  + Add Weekly Program
                </button>
                <button
                  onClick={() => handleAddProgram('monthly')}
                  className="px-4 py-2 rounded-xl border border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 transition font-semibold"
                >
                  + Add Monthly Program
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Home Tab */}
                {activeTab === 'home' && (
                  <div className="space-y-5 sm:space-y-8">
                    <HeroSection 
                      upcomingPrograms={programs}
                      onTabChange={setActiveTab}
                      currentUser={currentUser}
                    />

                    <div>
                      <h3 className="text-lg sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Upcoming Daily Prayers</h3>
                      <ProgramList
                        programs={programs}
                        category="daily"
                        registeredProgramIds={registeredProgramIds}
                        onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
                      />
                    </div>
                  </div>
                )}

                {/* Programs Feed Tab */}
                {activeTab === 'programs' && (
                  <div className="space-y-5 sm:space-y-8 pb-4 sm:pb-20">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground" style={{fontFamily:'var(--font-display)'}}>All Programs</h2>
                    </div>
                    
                    <div className="space-y-6 sm:space-y-12">
                      {programs.filter(p => p.category === 'daily').length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-xl font-semibold text-primary border-b border-border/50 pb-2 mb-3 sm:mb-4 flex items-center gap-2">
                            <span className="material-symbols-rounded text-[20px] sm:text-[24px]">volunteer_activism</span> Daily Prayers
                          </h3>
                          <ProgramList
                            programs={programs}
                            category="daily"
                            isAdmin={isAdmin}
                            onEdit={setEditingProgram}
                            onDelete={handleDeleteProgram}
                            registeredProgramIds={registeredProgramIds}
                            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
                          />
                        </div>
                      )}

                      {programs.filter(p => p.category === 'weekly').length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-xl font-semibold text-secondary border-b border-border/50 pb-2 mb-3 sm:mb-4 flex items-center gap-2">
                            <span className="material-symbols-rounded text-[20px] sm:text-[24px]">calendar_month</span> Weekly Events
                          </h3>
                          <ProgramList
                            programs={programs}
                            category="weekly"
                            isAdmin={isAdmin}
                            onEdit={setEditingProgram}
                            onDelete={handleDeleteProgram}
                            registeredProgramIds={registeredProgramIds}
                            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
                          />
                        </div>
                      )}

                      {programs.filter(p => p.category === 'monthly').length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-xl font-semibold text-accent border-b border-border/50 pb-2 mb-3 sm:mb-4 flex items-center gap-2">
                            <span className="material-symbols-rounded text-[20px] sm:text-[24px]">celebration</span> Monthly Meets
                          </h3>
                          <ProgramList
                            programs={programs}
                            category="monthly"
                            isAdmin={isAdmin}
                            onEdit={setEditingProgram}
                            onDelete={handleDeleteProgram}
                            registeredProgramIds={registeredProgramIds}
                            onToggleRegistration={currentUser ? handleToggleRegistration : undefined}
                          />
                        </div>
                      )}
                    </div>
                  </div>
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

                {/* Reflections Tab */}
                {activeTab === 'reflections' && (
                  <ReflectionsView />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <BottomNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            currentUser={currentUser}
            onProfileClick={() => {
              if (currentUser) {
                setCurrentPage('settings');
              } else {
                setShowAuthModal(true);
              }
            }}
          />
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
