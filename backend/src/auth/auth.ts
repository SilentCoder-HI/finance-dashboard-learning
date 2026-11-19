import { resolvePermissions } from "@/model/permission.service.js";
import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { Router } from "express";
import type { Request, Response } from "express";

import jwt from "jsonwebtoken"
export const authRoutes = Router();

// authRoutes.post("/register", async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body ?? {};

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const normalizedEmail = email.toLowerCase().trim();
//     const existingUser = await User.findOne({ email: normalizedEmail });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       username: username.trim(),
//       email: normalizedEmail,
//       password: hashedPassword,
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
    if (!user) {
      return res.status(401).json({ message: "User dont exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if(!user.isActive){
      return res.status(403).json({message : "Account is disabled"})
    }

    const permission = resolvePermissions(user)
    const token = jwt.sign(
      {
        userId: user._id,
        companyId: user.companyId ? String(user.companyId) : null,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    })
    
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        companyId: user.companyId ? String(user.companyId) : null,
        permissions : permission,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
