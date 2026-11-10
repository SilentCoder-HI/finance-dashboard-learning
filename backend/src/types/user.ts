export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export interface Invoice {
  id: string;
  date: string; // "2026-01-01"
  customer: string;
  amount: number;
  status: InvoiceStatus;
}

// ---------- User ----------
export type UserRole = "admin" | "customer";

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  avatar: string;
  bio: string;
  language: string;
  dateOfBirth: string;
}

export interface Company {
  name: string; // matches Invoice.customer
  industry: string;
  website: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Preferences {
  theme: "light" | "dark";
  currency: string;
  notifications: {
    email: boolean;
    sms: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // demo only - never store plain text in real apps
  role: UserRole;
  isActive: boolean;
  profile: UserProfile;
  company: Company;
  address: Address;
  preferences: Preferences;
  createdAt: string;
  lastLogin: string;
}
