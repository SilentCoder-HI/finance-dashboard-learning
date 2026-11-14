import type { LucideIcon } from "lucide-react";
import {
    LayoutGrid,
    Receipt,
    Users,
    BarChart3,
    UserCog,
    Settings,
    Building2,
    Globe,
    UserRound,
} from "lucide-react";
import type { Role } from "../store/store";

export type NavItem = {
    path: string;
    label: string;
    icon: LucideIcon;
    roles: Role[];
};

// Single source of truth for the sidebar AND the route guard.
// The sidebar renders: config.filter((item) => item.roles.includes(user.role))
export const navConfig: NavItem[] = [
    { path: "/", label: "Overview", icon: LayoutGrid, roles: ["superadmin", "admin", "accountant", "viewer"] },
    { path: "/invoices", label: "Invoices", icon: Receipt, roles: ["superadmin", "admin", "accountant", "viewer"] },
    { path: "/customers", label: "Customers", icon: Users, roles: ["superadmin", "admin", "accountant", "viewer"] },
    { path: "/reports", label: "Reports", icon: BarChart3, roles: ["superadmin", "admin", "accountant"] },
    { path: "/team", label: "Team", icon: UserCog, roles: ["superadmin", "admin"] },
    { path: "/company-settings", label: "Company settings", icon: Settings, roles: ["superadmin", "admin"] },
    { path: "/companies", label: "Companies", icon: Building2, roles: ["superadmin"] },
    { path: "/platform-summary", label: "Platform summary", icon: Globe, roles: ["superadmin"] },
    { path: "/profile", label: "Profile", icon: UserRound, roles: ["superadmin", "admin", "accountant", "viewer"] },
];
