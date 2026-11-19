// frontend/src/types.ts
// Mirrors the backend models. The backend is the source of truth.

// ---------- Permissions & roles ----------
export const ROLES = ["superadmin", "admin", "accountant", "viewer"] as const;
export type Role = (typeof ROLES)[number];

// Same strings as backend/src/permissions.ts. A plain string is fine on the
// frontend, because the backend decides what a permission means.
export type Permission = string;

export interface PermissionOverrides {
  grant: Permission[];
  deny: Permission[];
}

// ---------- Company ----------
export interface Company {
  id: string;
  name: string;
  slug: string;
  businessType: string;
  currency: string; // "USD" | "EUR" | "PKR" ...
  timezone: string;
  modules: string[];
  isActive: boolean;
}

// ---------- Auth ----------
// What /auth/login and /auth/me return (stored in Redux, no password, no hash)
export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  companyId: string | null; // null only for superadmin
  isActive?: boolean;
  permissions: Permission[]; // final list: role + grant - deny
}

export interface AuthResponse {
  message?: string;
  user: Omit<AuthUser, "permissions">;
  permissions: Permission[];
}

// ---------- Users (Users table + Manage panel) ----------
export interface UserListItem {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  companyId: string | null;
  isActive: boolean;
  permissionOverrides: PermissionOverrides;
  createdAt: string;
}

// GET /api/users/:id/permissions
export interface UserPermissionDetail {
  role: Role;
  rolePermissions: Permission[]; // what the role gives by default
  overrides: PermissionOverrides; // personal exceptions
  effective: Permission[]; // role + grant - deny
}

// PUT /api/users/:id/permissions  (send the desired final set, server computes the diff)
export interface UpdateUserPermissionsBody {
  permissions: Permission[];
}

// ---------- Customers ----------
export interface Customer {
  id: string;
  companyId: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  status: "active" | "inactive";
}

// ---------- Invoices ----------
// Statuses are lowercase, same as the database.
export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

export interface Invoice {
  id: string;
  companyId: string;
  invoiceNumber: string; // "TV-00001"
  customerId: string;
  customerName: string;
  description?: string;
  amount: number; // INTEGER minor units: 12345 = 123.45
  paidAmount: number; // INTEGER minor units
  status: InvoiceStatus;
  issueDate: string; // ISO date
  dueDate: string; // ISO date
  paidDate: string | null;
}

// ---------- Orders ----------
export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number; // minor units
}

export interface Order {
  id: string;
  companyId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number; // minor units
  status: OrderStatus;
  orderDate: string;
}

// ---------- Helpers ----------
// Money is stored in minor units, so always format before showing it.
export const formatMoney = (minor: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(minor / 100);

// One permission check used everywhere (hook, <Can>, nav, routes).
export const hasPermission = (perms: readonly Permission[], perm: Permission) =>
  perms.includes("*") || perms.includes(perm);