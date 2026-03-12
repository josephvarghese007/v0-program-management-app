export type Program = {
  id: string;
  title: string;
  icon: string;
  category: 'daily' | 'weekly' | 'monthly';
  type: 'online' | 'offline';
  time: string;
  platform?: string;
  link?: string;
  day?: string;
  occurrence?: string;
  venue?: string;
  note?: string;
  description?: string;
  maxAttendees?: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
};

export type Registration = {
  id: string;
  userId: string;
  programId: string;
  registeredAt: string;
  status: 'registered' | 'attended' | 'cancelled';
};

export type Subscription = {
  id: string;
  userId: string;
  programCategory: 'daily' | 'weekly' | 'monthly' | 'all';
  enableEmail: boolean;
  enableSMS: boolean;
  createdAt: string;
};

export type AppContextType = {
  programs: Program[];
  currentUser: User | null;
  registrations: Registration[];
  subscriptions: Subscription[];
  isAdmin: boolean;
};
