'use client';

import React, { useState, useEffect } from 'react';
import { Program, User } from '@/lib/types';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  upcomingPrograms: Program[];
  onTabChange: (tab: 'programs' | 'home' | 'calendar') => void;
  currentUser: User | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export function HeroSection({ upcomingPrograms, onTabChange, currentUser }: HeroSectionProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const stats = [
    { icon: <span className="material-symbols-rounded">volunteer_activism</span>, label: 'Daily Prayers', count: upcomingPrograms.filter(p => p.category === 'daily').length, tab: 'daily' as const },
    { icon: <span className="material-symbols-rounded">calendar_month</span>, label: 'Weekly Events', count: upcomingPrograms.filter(p => p.category === 'weekly').length, tab: 'weekly' as const },
    { icon: <span className="material-symbols-rounded">celebration</span>, label: 'Monthly Meets', count: upcomingPrograms.filter(p => p.category === 'monthly').length, tab: 'monthly' as const },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 border border-white/10 shadow-lg bg-card/40 backdrop-blur-md p-0">
      {/* Decorative background elements - Minimalist dark mode */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="relative p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 p-3 pr-5 bg-black/40 rounded-2xl shadow-sm border border-white/10 mb-6 backdrop-blur-sm">
              <img src="/icon.svg" alt="Jesus Youth Logo" className="w-10 h-10 drop-shadow-sm invert" />
              <div className="flex flex-col">
                <span className="font-bold text-primary tracking-tight leading-none">Jesus Youth</span>
                <span className="text-[10px] text-white/50 font-semibold tracking-wider uppercase mt-1">Angamaly Zone</span>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
              Community <br/><span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">In Faith</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
              Connect with the Angamaly Zone through daily prayers, weekly gatherings, and meaningful monthly celebrations.
            </p>
            
            <div className="flex items-center gap-4">
              {!currentUser ? (
                <button
                  onClick={() => onTabChange('programs')}
                  className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  Explore Programs
                </button>
              ) : (
                <div className="px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm inline-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center font-bold shadow-inner">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Welcome Back</p>
                    <p className="text-sm font-bold text-foreground">{currentUser.name}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {isHydrated ? stats.map((stat, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabChange('programs')}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between h-full group cursor-pointer hover:border-white/20 hover:bg-black/60"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left text-white/80">{stat.icon}</div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">{stat.count}</div>
                  <div className="text-sm text-white/50 font-semibold">{stat.label}</div>
                </div>
              </motion.button>
            )) : [0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm text-left animate-pulse h-40"
              >
                <div className="w-10 h-10 bg-white/5 rounded-full mb-4"></div>
                <div className="w-12 h-8 bg-white/5 rounded-md mb-2"></div>
                <div className="w-20 h-4 bg-white/5 rounded-md"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
