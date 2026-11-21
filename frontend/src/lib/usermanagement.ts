const API = import.meta.env.VITE_API_URL ?? "http://localhost:2000";

interface HandleUserProps {
    adminId?: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    userId?: string;
    action?: "update" | "permissions" | "status";
    permissions?: string[];
    isActive?: boolean;
}

async function request<T = unknown>(path: string, method: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API}${path}`, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));


    if (!res.ok) throw new Error(json.message ?? `Request failed (${res.status})`);
    return json as T;
}

export const handleUser = async ({
    action,
    method = "PUT",
    userId,
    isActive,
    permissions,
}: HandleUserProps) => {
    if (!userId) throw new Error("userId is required");

    switch (action) {
        case "status":
            return request(`/api/users/${userId}/status`, method, { isActive });

        case "permissions":
            return request(`/api/users/${userId}/permissions`, method, { permissions });

        case "update": {
            const results: unknown[] = [];

            if (isActive !== undefined) {
                results.push(await request(`/api/users/${userId}/status`, method, { isActive }));
            }
            if (permissions !== undefined) {
                results.push(await request(`/api/users/${userId}/permissions`, method, { permissions }));
            }
            // if (data) {
            //     results.push(await request(`/api/users/${userId}`, method, data));
            // }
            return results;
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};