// users.service.ts - simple DB helpers (dummy)
export async function getUsersByCompany(companyId: string) {
  // return await User.find({ companyId });
  return [{ id: "1", name: "Demo User", companyId }];
}
