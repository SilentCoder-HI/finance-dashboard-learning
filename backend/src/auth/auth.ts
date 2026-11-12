import { getDatabyUser } from "@/data/user.js";
import { Router } from "express";
import type { Request, Response } from "express";

export const authRoutes = Router();

authRoutes.post("/login", (req: Request, res: Response) => {
    const { username } = req.body ?? [];
    const users = getDatabyUser(username);
    if (!users) {
        return res.status(401).json({ error: "User not found" });
    }
    const userE = {
        id: users.id,
        name: users.company.name,
        role: users.role,
    }

    return res.json(userE);
});