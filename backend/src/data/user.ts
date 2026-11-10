import data from "@Data/user/data.json" with { type: "json" };
import type { User } from "../types/user.js";

const allUsers: User[] = data as User[];

export const getDatabyUser = (username: unknown): User | undefined => {
    if (typeof username !== "string") return undefined;

    return allUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase() ||
              user.company.name.toLowerCase() === username.toLowerCase()
    );
}