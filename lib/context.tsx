'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Program, User, Registration, Subscription } from './types';
import * as storage from './storage';

interface AppContextType {
  programs: Program[];
  currentUser: User | null;
  registrations: Registration[];
  subscriptions: Subscription[];
  isAdmin: boolean;
  
  // Actions
  addProgram: (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProgram: (id: string, updates: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
  
  loginUser: (email: string, name: string, phone?: string) => User;
  logoutUser: () => void;
  loginAsAdmin: (password: string) => boolean;
  
  registerForProgram: (programId: string) => void;
  unregisterFromProgram: (programId: string) => void;
  isRegisteredForProgram: (programId: string) => boolean;
  
  updateSubscription: (updates: Partial<Subscription>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage immediately
  const [programs, setPrograms] = useState<Program[]>(() => {
    if (typeof window === 'undefined') return [];
    storage.initializeStorage();
    return storage.getPrograms();
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    return storage.getCurrentUser();
  });
  
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    if (typeof window === 'undefined') return [];
    return storage.getRegistrations();
  });
  
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    if (typeof window === 'undefined') return [];
    return storage.getSubscriptions();
  });
  
  const [isAdmin, setIsAdmin] = useState(false);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      storage.savePrograms(programs);
    }
  }, [programs]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      storage.setCurrentUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      storage.saveRegistrations(registrations);
    }
  }, [registrations]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      storage.saveSubscriptions(subscriptions);
    }
  }, [subscriptions]);

  const addProgram = (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProgram = storage.addProgram(program);
    setPrograms((prev) => [...prev, newProgram]);
  };

  const updateProgram = (id: string, updates: Partial<Program>) => {
    storage.updateProgram(id, updates);
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deleteProgram = (id: string) => {
    storage.deleteProgram(id);
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  const loginUser = (email: string, name: string, phone?: string): User => {
    let user = storage.getUserByEmail(email);
    if (!user) {
      user = storage.addUser(email, name, phone);
    }
    storage.setCurrentUser(user);
    setCurrentUser(user);
    return user;
  };

  const logoutUser = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const loginAsAdmin = (password: string): boolean => {
    const isValid = storage.verifyAdminPassword(password);
    if (isValid) {
      setIsAdmin(true);
    }
    return isValid;
  };

  const registerForProgram = (programId: string) => {
    if (!currentUser) return;
    const reg = storage.registerForProgram(currentUser.id, programId);
    setRegistrations((prev) => {
      const existing = prev.find((r) => r.id === reg.id);
      return existing ? prev : [...prev, reg];
    });
  };

  const unregisterFromProgram = (programId: string) => {
    if (!currentUser) return;
    storage.unregisterFromProgram(currentUser.id, programId);
    setRegistrations((prev) =>
      prev.filter((r) => !(r.userId === currentUser.id && r.programId === programId))
    );
  };

  const isRegisteredForProgram = (programId: string): boolean => {
    if (!currentUser) return false;
    return storage.isUserRegisteredForProgram(currentUser.id, programId);
  };

  const updateSubscription = (updates: Partial<Subscription>) => {
    if (!currentUser) return;
    const sub = storage.updateUserSubscription(currentUser.id, updates);
    setSubscriptions((prev) => {
      const existing = prev.find((s) => s.id === sub.id);
      return existing
        ? prev.map((s) => (s.id === sub.id ? sub : s))
        : [...prev, sub];
    });
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <AppContext.Provider
      value={{
        programs,
        currentUser,
        registrations,
        subscriptions,
        isAdmin,
        addProgram,
        updateProgram,
        deleteProgram,
        loginUser,
        logoutUser,
        loginAsAdmin,
        registerForProgram,
        unregisterFromProgram,
        isRegisteredForProgram,
        updateSubscription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
