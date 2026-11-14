import { useEffect } from "react";
import { useAppSelector } from "../../store";
import { getUsersByCompany, getSuperUserData } from "@Data/data";
import { fetchCompanyusers } from "../../src/services/userService";
import { Button } from "@mui/material";

export default function UsersPage() {
  const user = useAppSelector((state) => state.auth.user);
  const users = user?.role === "superadmin"
    ? getSuperUserData().users
    : user?.companyId
      ? getUsersByCompany(String(user.companyId))
      : [];

  const loadUsers = async () => {
    if (!user?.companyId) {
      // setError("No company selected");
      return;
    }
    // setLoading(true);
    // setError(null);
    try {
      const rows = await fetchCompanyusers(String(user.companyId));
      // setUsers(rows);
    } catch (e) {
      // setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <Button onClick={loadUsers}>Click it</Button>
      <div className="overflow-x-auto rounded-2xl border border-white/50 bg-white/40 shadow-lg backdrop-blur-xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/40">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/20">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.companyId ?? "All"}</td>
                <td className="p-3">{u.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
