import { Program, User, Registration, Subscription } from './types';

const STORAGE_KEYS = {
  PROGRAMS: 'jy_programs',
  USERS: 'jy_users',
  REGISTRATIONS: 'jy_registrations',
  SUBSCRIPTIONS: 'jy_subscriptions',
  CURRENT_USER: 'jy_current_user',
  ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'jesusyouth2024',
};

const INITIAL_PROGRAMS: Program[] = [
  {
    id: '1',
    title: 'Divine Mercy Chaplet',
    type: 'online',
    link: 'https://us02web.zoom.us/j/83202505304?pwd=M2dlemdzWElvcWdPWEJ2ek1mTnNxQT09',
    icon: '🙏',
    platform: 'Zoom',
    time: '9:30 PM IST',
    category: 'daily',
    description: 'Join us for the Divine Mercy Chaplet prayer session online.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Daily Rosary',
    type: 'online',
    link: 'https://meet.google.com/fbg-yaib-xsr',
    icon: '📿',
    platform: 'Google Meet',
    time: '9:00 PM IST',
    category: 'daily',
    description: 'Daily Rosary recitation with the community.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Monday Gatherings',
    day: 'Monday',
    time: '7:00 PM',
    venue: 'Assisi Santhi Kendra, Karukutty',
    icon: '🌟',
    category: 'weekly',
    type: 'offline',
    description: 'Weekly in-person gathering for prayer and fellowship.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Chat With Jesus',
    day: 'Wednesday',
    time: '5:00 PM',
    venue: 'Jolly Nursery, Angamaly (Opp. LF Hospital)',
    icon: '✝️',
    category: 'weekly',
    type: 'offline',
    description: 'Discussion and reflection session with the community.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Parish & Campus Prayer Groups',
    day: 'Various',
    time: 'Varies',
    venue: 'Multiple locations',
    icon: '⛪',
    category: 'weekly',
    type: 'offline',
    description: 'Join prayer groups across different parishes and campuses.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Zonal Adoration',
    day: 'Wednesday',
    time: '7:00 PM',
    venue: 'Assisi Santhi Kendra, Karukutty',
    icon: '🕯️',
    category: 'weekly',
    type: 'offline',
    description: 'Eucharistic adoration service for spiritual nourishment.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'House Holds',
    occurrence: 'First Sundays',
    time: '3:00 PM',
    venue: 'Morning Star Home Science College',
    icon: '🏠',
    category: 'monthly',
    type: 'offline',
    description: 'Monthly household gatherings for community building.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Canteen',
    occurrence: 'Second Saturdays',
    time: '2:00 PM',
    venue: 'Angamaly Basilica',
    icon: '🎉',
    category: 'monthly',
    type: 'offline',
    note: 'For Teens',
    description: 'Monthly event for teens to connect and have fun together.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initialize storage with default data if empty
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.PROGRAMS)) {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify([]));
  }
}

// Programs
export function getPrograms(): Program[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
  return data ? JSON.parse(data) : INITIAL_PROGRAMS;
}

export function savePrograms(programs: Program[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
}

export function addProgram(program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Program {
  const programs = getPrograms();
  const newProgram: Program = {
    ...program,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  programs.push(newProgram);
  savePrograms(programs);
  return newProgram;
}

export function updateProgram(id: string, updates: Partial<Program>) {
  const programs = getPrograms();
  const index = programs.findIndex((p) => p.id === id);
  if (index !== -1) {
    programs[index] = {
      ...programs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    savePrograms(programs);
  }
}

export function deleteProgram(id: string) {
  const programs = getPrograms();
  const filtered = programs.filter((p) => p.id !== id);
  savePrograms(filtered);
}

// Users
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function addUser(email: string, name: string, phone?: string): User {
  const users = getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    phone,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isAdmin: false,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.email === email);
}

// Registrations
export function getRegistrations(): Registration[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  return data ? JSON.parse(data) : [];
}

export function saveRegistrations(registrations: Registration[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
}

export function registerForProgram(userId: string, programId: string): Registration {
  const registrations = getRegistrations();
  const existing = registrations.find(
    (r) => r.userId === userId && r.programId === programId && r.status === 'registered'
  );
  if (existing) return existing;

  const newReg: Registration = {
    id: Date.now().toString(),
    userId,
    programId,
    registeredAt: new Date().toISOString(),
    status: 'registered',
  };
  registrations.push(newReg);
  saveRegistrations(registrations);
  return newReg;
}

export function unregisterFromProgram(userId: string, programId: string) {
  const registrations = getRegistrations();
  const filtered = registrations.filter(
    (r) => !(r.userId === userId && r.programId === programId)
  );
  saveRegistrations(filtered);
}

export function getUserRegistrations(userId: string): Registration[] {
  const registrations = getRegistrations();
  return registrations.filter((r) => r.userId === userId && r.status === 'registered');
}

export function isUserRegisteredForProgram(userId: string, programId: string): boolean {
  const registrations = getRegistrations();
  return registrations.some(
    (r) => r.userId === userId && r.programId === programId && r.status === 'registered'
  );
}

// Subscriptions
export function getSubscriptions(): Subscription[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
  return data ? JSON.parse(data) : [];
}

export function saveSubscriptions(subscriptions: Subscription[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
}

export function getUserSubscription(userId: string): Subscription | undefined {
  const subscriptions = getSubscriptions();
  return subscriptions.find((s) => s.userId === userId);
}

export function updateUserSubscription(
  userId: string,
  updates: Partial<Subscription>
): Subscription {
  const subscriptions = getSubscriptions();
  let subscription = subscriptions.find((s) => s.userId === userId);

  if (!subscription) {
    subscription = {
      id: Date.now().toString(),
      userId,
      programCategory: 'all',
      enableEmail: true,
      enableSMS: false,
      createdAt: new Date().toISOString(),
    };
    subscriptions.push(subscription);
  }

  const updated = { ...subscription, ...updates };
  const index = subscriptions.findIndex((s) => s.id === subscription!.id);
  subscriptions[index] = updated;
  saveSubscriptions(subscriptions);
  return updated;
}

// Current User
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// Admin verification
export function verifyAdminPassword(password: string): boolean {
  return password === STORAGE_KEYS.ADMIN_PASSWORD;
}
