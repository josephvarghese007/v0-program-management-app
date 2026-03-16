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
  isLoading: boolean;
  
  // Actions
  addProgram: (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProgram: (id: string, updates: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
  
  loginUser: (email: string, name: string, phone?: string) => Promise<User>;
  logoutUser: () => void;
  loginAsAdmin: (password: string) => boolean;
  
  registerForProgram: (programId: string) => Promise<void>;
  unregisterFromProgram: (programId: string) => Promise<void>;
  isRegisteredForProgram: (programId: string) => boolean;
  
  updateSubscription: (updates: Partial<Subscription>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/programs');
        if (res.ok) {
          const data = await res.json();
          setPrograms(data);
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();

    // Check if user session exists in localStorage
    if (typeof window !== 'undefined') {
      const storedUser = storage.getCurrentUser();
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
  }, []);

  // Fetch User-specific Data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const regRes = await fetch(`/api/registrations?userId=${currentUser.id}`);
          if (regRes.ok) {
            setRegistrations(await regRes.json());
          }
          const subRes = await fetch(`/api/subscriptions?userId=${currentUser.id}`);
          if (subRes.ok) {
            const subData = await subRes.json();
            if (subData) {
              setSubscriptions([subData]);
            }
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchUserData();
    } else {
      setRegistrations([]);
      setSubscriptions([]);
    }
  }, [currentUser]);

  const addProgram = async (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => {
    const res = await fetch('/api/programs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(program),
    });
    if (res.ok) {
      const newProgram = await res.json();
      setPrograms((prev) => [newProgram, ...prev]);
    }
  };

  const updateProgram = async (id: string, updates: Partial<Program>) => {
    const res = await fetch(`/api/programs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const updatedProgram = await res.json();
      setPrograms((prev) =>
        prev.map((p) => (p.id === id ? updatedProgram : p))
      );
    }
  };

  const deleteProgram = async (id: string) => {
    const res = await fetch(`/api/programs/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const loginUser = async (email: string, name: string, phone?: string): Promise<User> => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, phone }),
    });
    if (!res.ok) throw new Error('Failed to login');
    const user = await res.json();
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

  const registerForProgram = async (programId: string) => {
    if (!currentUser) return;
    const res = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, programId }),
    });
    if (res.ok) {
      const reg = await res.json();
      setRegistrations((prev) => {
        const existing = prev.find((r) => r.id === reg.id);
        return existing ? prev : [...prev, reg];
      });
    }
  };

  const unregisterFromProgram = async (programId: string) => {
    if (!currentUser) return;
    const res = await fetch(`/api/registrations?userId=${currentUser.id}&programId=${programId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setRegistrations((prev) =>
        prev.filter((r) => !(r.userId === currentUser.id && r.programId === programId))
      );
    }
  };

  const isRegisteredForProgram = (programId: string): boolean => {
    if (!currentUser) return false;
    return registrations.some(
      (r) => r.userId === currentUser.id && r.programId === programId
    );
  };

  const updateSubscription = async (updates: Partial<Subscription>) => {
    if (!currentUser) return;
    const res = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, ...updates }),
    });
    if (res.ok) {
      const sub = await res.json();
      setSubscriptions((prev) => {
        const existing = prev.find((s) => s.id === sub.id);
        return existing
          ? prev.map((s) => (s.id === sub.id ? sub : s))
          : [...prev, sub];
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        programs,
        currentUser,
        registrations,
        subscriptions,
        isAdmin,
        isLoading,
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
