// backend/src/permissions.ts  (single source of truth for permission names)
export const PERMISSIONS = {
  dashboard: ["dashboard:read"],
  invoice: ["invoice:read", "invoice:write", "invoice:delete"],
  customer: ["customer:read", "customer:write", "customer:delete"],
  order: ["order:read", "order:write", "order:delete"],
  report: ["report:read", "report:export"],
  user: ["user:read", "user:write", "user:delete", "user:manage-permissions"],
  company: ["company:read", "company:write"],
  platform: ["platform:read"],
  profile: ["profile:read", "profile:write"],
} as const;

export const ALL_PERMISSIONS = Object.values(PERMISSIONS).flat();
export type Permission = (typeof ALL_PERMISSIONS)[number];
