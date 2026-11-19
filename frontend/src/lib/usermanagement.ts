import type { UserListItem } from "../types";

interface handleUserProps {
    adminId?: string
    method?: "GET" | "POST" | "PUT" | "DELETE";
    userId?: string;
    action?: "update" | "permissions" | "status";
    data?: UserListItem,
    permissions?: string[];
    isActive?: boolean;
}
export const handleUser = ({ action , isActive}: handleUserProps) => {
    console.log(action , isActive)
}