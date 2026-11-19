// backend/src/services/permission.service.ts
import { ALL_PERMISSIONS, type Permission } from "./permissions.js";
import type { Role } from "../model/user.js";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superadmin: [...ALL_PERMISSIONS],
  admin: [
    "dashboard:read",
    "invoice:read", "invoice:write", "invoice:delete",
    "customer:read", "customer:write", "customer:delete",
    "order:read", "order:write", "order:delete",
    "report:read", "report:export",
    "user:read", "user:write", "user:delete", "user:manage-permissions",
    "company:read", "company:write",
    "profile:read", "profile:write",
  ],
  accountant: [
    "dashboard:read",
    "invoice:read", "invoice:write",
    "customer:read",
    "order:read", "order:write",
    "report:read",
    "profile:read", "profile:write",
  ],
  viewer: [
    "dashboard:read",
    "invoice:read",
    "customer:read",
    "order:read",
    "profile:read", "profile:write",
  ],
};

// Only the fields it needs, so it works with a Mongoose doc, a .lean() result or a plain object
export interface PermissionSubject {
  role: Role;
  permissionOverrides?: { grant?: string[]; deny?: string[] } | null;
}

// final = role + grant - deny  (deny always wins)
export function resolvePermissions(user: PermissionSubject): Permission[] {
  const set = new Set<Permission>(ROLE_PERMISSIONS[user.role] ?? []);
  for (const p of user.permissionOverrides?.grant ?? []) set.add(p as Permission);
  for (const p of user.permissionOverrides?.deny ?? []) set.delete(p as Permission);
  if (user.role === "superadmin") for (const p of ALL_PERMISSIONS) set.add(p);
  return [...set];
}

export function hasPermission(perms: string[] | Set<string>, perm: string): boolean {
  const s = perms instanceof Set ? perms : new Set(perms);
  return s.has("*") || s.has(perm);
}