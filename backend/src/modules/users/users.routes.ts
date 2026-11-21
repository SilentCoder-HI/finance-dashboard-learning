// users.routes.ts - simple Express routes (dummy)
import { verifyJwt, type AuthenticatedRequest } from "@/middleware/verifyJWT.js";
import { User } from "@/model/user.js";
import { Router, type Response } from "express";
import { ROLE_PERMISSIONS, resolvePermissions } from "@/model/permission.service.js";
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


routerUsers.put('/:id/status', verifyJwt, async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.params?.id;
  const { isActive } = req.body;
  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }


  try {
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { isActive },
      { returnDocument: 'after' }
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User status updated successfully',
      user: updatedUser,
    });

  }
  catch (Error) {

  }
})

routerUsers.put('/:id/permissions', verifyJwt, async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.params?.id;
  const { permissions } = req.body;
  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const user = await User.findById(user_id)
    const roleDefaults = ROLE_PERMISSIONS[user?.role] ?? []
    const grant = permissions.filter((p) => !roleDefaults.includes(p))
    const deny = roleDefaults.filter((p) => !permissions.includes(p))
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $set: { permissionOverrides: { grant, deny } } },
      { returnDocument: 'after' }
    );
    
    return res.status(200).json({
      message: 'User status updated successfully',
      user: updatedUser,
    });
  } catch (e) {
    console.error(e)
  }
})




export default routerUsers;
