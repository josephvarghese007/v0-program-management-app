'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@/lib/types';

export type NavTab = 'home' | 'programs' | 'reflections' | 'calendar' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentUser: User | null;
  onProfileClick: () => void;
}

const appNavItems: { id: NavTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'programs', label: 'Programs', icon: 'workspaces' },
  { id: 'reflections', label: 'Daily', icon: 'auto_stories' },
  { id: 'calendar', label: 'Calendar', icon: 'event' },
];

export function BottomNav({ activeTab, onTabChange, currentUser, onProfileClick }: BottomNavProps) {
  const handleProfileClick = () => {
    onTabChange('profile');
    onProfileClick();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-safe flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative bg-card/80 border border-border/60 backdrop-blur-xl shadow-2xl rounded-[28px] px-2 py-2 flex items-center gap-2">
        {appNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex items-center rounded-full px-3 py-2 transition-all duration-300"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                <span className="material-symbols-rounded text-[22px]">{item.icon}</span>
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 ml-2 overflow-hidden text-sm font-semibold text-foreground whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}

        <div className="w-px h-8 bg-border/60 mx-1 rounded-full"></div>

        <button
          onClick={handleProfileClick}
          className="relative flex items-center rounded-full px-3 py-2 transition-all duration-300"
        >
          {activeTab === 'profile' && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${
              activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {currentUser && activeTab !== 'profile' ? (
              <span className="font-semibold text-[16px]">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <span className="material-symbols-rounded text-[22px]">person</span>
            )}
          </span>
          <AnimatePresence>
            {activeTab === 'profile' && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="relative z-10 ml-2 overflow-hidden text-sm font-semibold text-foreground whitespace-nowrap"
              >
                {currentUser ? 'Profile' : 'Sign In'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
