import React from 'react';
import { Program } from '@/lib/types';

interface HeroSectionProps {
  upcomingPrograms: Program[];
  onTabChange: (tab: string) => void;
  currentUser: any;
}

export function HeroSection({ upcomingPrograms, onTabChange, currentUser }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-orange-100 p-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="relative p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div>
            <div className="text-5xl mb-2">✝️</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
              Jesus Youth
            </h1>
            <p className="text-lg text-primary font-semibold mb-2">Angamaly Zone</p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Connect with our community through daily prayers, weekly gatherings, and meaningful monthly celebrations.
            </p>
            {!currentUser && (
              <button
                onClick={() => onTabChange('daily')}
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Explore Programs
              </button>
            )}
            {currentUser && (
              <p className="text-sm text-muted-foreground italic">
                Welcome back, {currentUser.name}
              </p>
            )}
          </div>

          {/* Right stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🙏', label: 'Daily Prayers', count: upcomingPrograms.filter(p => p.category === 'daily').length },
              { icon: '📅', label: 'Weekly Events', count: upcomingPrograms.filter(p => p.category === 'weekly').length },
              { icon: '🎉', label: 'Monthly Meets', count: upcomingPrograms.filter(p => p.category === 'monthly').length },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-orange-100 hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.count}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
