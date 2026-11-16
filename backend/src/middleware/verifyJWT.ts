import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    companyId: string;
    role: string;
  };
}

export const verifyJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided."
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      companyId: string;
      role: string;
    }

    req.user = decoded
    
    next()
  }
  catch (e) {

  }
};