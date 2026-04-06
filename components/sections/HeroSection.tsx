'use client';

import React, { useState, useEffect } from 'react';
import { Program, User } from '@/lib/types';
import { motion } from 'framer-motion';
import { ProgramIcon } from '../ui/ProgramIcon';

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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

export function HeroSection({ upcomingPrograms, onTabChange, currentUser }: HeroSectionProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const stats = [
    {
      icon: 'volunteer_activism',
      label: 'Daily Prayers',
      count: upcomingPrograms.filter((p) => p.category === 'daily').length,
    },
    {
      icon: 'calendar_month',
      label: 'Weekly Events',
      count: upcomingPrograms.filter((p) => p.category === 'weekly').length,
    },
    {
      icon: 'celebration',
      label: 'Monthly Meets',
      count: upcomingPrograms.filter((p) => p.category === 'monthly').length,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-border/60 glass-panel-strong p-0">
      <div className="absolute -top-16 -right-16 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative p-5 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2.5 px-2.5 py-1.5 bg-card/70 rounded-xl shadow-sm border border-border/60 mb-4 sm:mb-6 backdrop-blur-sm">
              <img src="/image.png" alt="Jesus Youth Logo" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm sm:text-base text-foreground tracking-tight leading-none">
                  Jesus Youth
                </span>
                <span className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold tracking-wider uppercase mt-0.5">
                  Angamaly Zone
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight leading-tight">
              A Community <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Rooted in Faith
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground mb-5 sm:mb-8 leading-relaxed max-w-md">
              Join daily prayers, weekly gatherings, and monthly celebrations with the Angamaly Zone.
            </p>

            <div className="flex items-center gap-4">
              {!currentUser ? (
                <button
                  onClick={() => onTabChange('programs')}
                  className="px-6 py-3 sm:px-8 sm:py-3.5 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                >
                  Explore Programs
                </button>
              ) : (
                <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-card/70 backdrop-blur-md rounded-xl sm:rounded-2xl border border-border/60 inline-flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-primary to-accent text-primary-foreground flex items-center justify-center font-semibold shadow-inner text-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      Welcome Back
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">{currentUser.name}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {isHydrated
              ? stats.map((stat) => (
                  <motion.button
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTabChange('programs')}
                    className="bg-card/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-border/60 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between h-full group cursor-pointer"
                  >
                    <ProgramIcon
                      icon={stat.icon}
                      className="text-xl sm:text-3xl text-primary mb-2 sm:mb-4 group-hover:scale-110 transition-transform origin-left"
                    />
                    <div>
                      <div className="text-xl sm:text-3xl font-semibold text-foreground mb-0.5">{stat.count}</div>
                      <div className="text-[11px] sm:text-sm text-muted-foreground font-semibold leading-tight">{stat.label}</div>
                    </div>
                  </motion.button>
                ))
              : [0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className="bg-card/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-border/60 shadow-sm text-left animate-pulse h-24 sm:h-40"
                  >
                    <div className="w-8 h-8 bg-muted/50 rounded-full mb-2"></div>
                    <div className="w-10 h-6 bg-muted/50 rounded-md mb-1"></div>
                    <div className="w-16 h-3 bg-muted/50 rounded-md"></div>
                  </div>
                ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
