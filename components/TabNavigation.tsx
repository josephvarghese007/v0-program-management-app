import React from 'react';

type NavigationTab = 'home' | 'daily' | 'weekly' | 'monthly' | 'calendar';

interface TabNavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const tabs: { id: NavigationTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'daily', label: 'Daily Prayers', icon: '🙏' },
  { id: 'weekly', label: 'Weekly', icon: '📅' },
  { id: 'monthly', label: 'Monthly', icon: '🎉' },
  { id: 'calendar', label: 'Calendar', icon: '📆' },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-card border-b border-border sticky top-[var(--header-height)] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
