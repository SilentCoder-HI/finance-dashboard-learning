import { tokenVerifyService } from "@/token/tokenService.js";
import type { NextFunction, Request, Response } from "express";


export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    
}
