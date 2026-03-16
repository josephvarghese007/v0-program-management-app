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

const navItems: { id: NavTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'programs', label: 'Portfolio', icon: 'work' },
  { id: 'reflections', label: 'Watchlist', icon: 'currency_exchange' },
  { id: 'calendar', label: 'Markets', icon: 'language' },
];

// Let's adapt the user's specific text while keeping the exact visual layout from the reference:
const appNavItems: { id: NavTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'programs', label: 'Programs', icon: 'work' },
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
      {/* Main Bar Container - matches the dark #1c1c1e background */}
      <div className="bg-[#1c1c1e] rounded-[32px] p-2 flex items-center gap-2 pointer-events-auto border border-white/5 shadow-2xl">
        
        {appNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex items-center transition-all duration-300 ease-in-out ${
                isActive ? 'bg-[#2c2c2e] rounded-full pr-5 pl-1 py-1 gap-3' : 'bg-[#1c1c1e] rounded-full p-1'
              }`}
            >
              {/* Icon Container */}
              <div 
                className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive ? 'bg-[#7cf86a] text-black' : 'bg-[#2c2c2e] text-white/60 hover:text-white'
                }`}
              >
                <span className="material-symbols-rounded text-[24px]">
                  {item.icon}
                </span>
              </div>
              
              {/* Text Label (Only shows if active) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <span className="text-white font-medium text-[15px] whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}

        {/* Separator - subtle line */}
        <div className="w-[1px] h-8 bg-white/10 mx-1 rounded-full"></div>

        {/* Profile / Sign In Button - mimicking the same style */}
        <button
          onClick={handleProfileClick}
          className={`relative flex items-center transition-all duration-300 ease-in-out ${
            activeTab === 'profile' ? 'bg-[#2c2c2e] rounded-full pr-5 pl-1 py-1 gap-3' : 'bg-[#1c1c1e] rounded-full p-1'
          }`}
        >
          <div 
            className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors duration-300 ${
              activeTab === 'profile' ? 'bg-[#7cf86a] text-black' : 'bg-[#2c2c2e] text-white/60 hover:text-white'
            }`}
          >
            {currentUser && activeTab !== 'profile' ? (
              <span className="font-bold text-[18px]">{currentUser.name.charAt(0).toUpperCase()}</span>
            ) : (
              <span className="material-symbols-rounded text-[24px]">person</span>
            )}
          </div>
          
          <AnimatePresence>
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="text-white font-medium text-[15px] whitespace-nowrap">
                  {currentUser ? 'Profile' : 'Sign In'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>
    </div>
  );
}
