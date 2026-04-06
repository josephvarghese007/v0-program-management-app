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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-2 pt-1 flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative bg-card/85 border border-border/60 backdrop-blur-xl shadow-2xl rounded-2xl px-1.5 py-1.5 flex items-center gap-0.5">
        {appNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex items-center rounded-full px-2 py-1.5 transition-all duration-300"
              aria-label={item.label}
              role="tab"
              aria-selected={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                <span className="material-symbols-rounded text-[20px]">{item.icon}</span>
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 ml-1.5 overflow-hidden text-xs font-semibold text-foreground whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}

        <div className="w-px h-6 bg-border/40 mx-0.5 rounded-full"></div>

        <button
          onClick={handleProfileClick}
          className="relative flex items-center rounded-full px-2 py-1.5 transition-all duration-300"
          aria-label={currentUser ? 'Profile' : 'Sign In'}
          role="tab"
          aria-selected={activeTab === 'profile'}
        >
          {activeTab === 'profile' && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
              activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            {currentUser && activeTab !== 'profile' ? (
              <span className="font-semibold text-[13px]">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <span className="material-symbols-rounded text-[20px]">person</span>
            )}
          </span>
          <AnimatePresence>
            {activeTab === 'profile' && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="relative z-10 ml-1.5 overflow-hidden text-xs font-semibold text-foreground whitespace-nowrap"
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
