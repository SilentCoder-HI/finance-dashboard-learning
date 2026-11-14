// users.routes.ts - simple Express routes (dummy)
import { Router } from "express";
import { getUsersByCompany } from "./users.service";

const router = Router();

router.get("/:companyId/users", async (req, res) => {
  const users = await getUsersByCompany(req.params.companyId);
  res.json(users);
});

export default router;
