// users.routes.ts - simple Express routes (dummy)
import { verifyJwt, type AuthenticatedRequest } from "@/middleware/verifyJWT.js";
import { User } from "@/model/user.js";
import { Router, type Response } from "express";
// import { getUsersByCompany } from "./users.service";

const routerUsers = Router();

routerUsers.get("/", verifyJwt, async (req: AuthenticatedRequest, res: Response) => {
  const companyId = req.user?.companyId
  const role = req.user?.role
  if (role == "superadmin" && companyId == null) {
    const users = await User.find({})
      .select("-passwordHash")
      .lean();
    return res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      data: users,
    });

  }
  if (!companyId) {
    return res.status(400).json({ message: "Company ID missing in token payload" });
  }
  const users = await User.find({ companyId })
    .select("-passwordHash")
    .lean();

  return res.status(200).json({
    message: "Users fetched successfully",
    count: users.length,
    data: users,
  });
});

export default routerUsers;
