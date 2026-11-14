// company.service.ts - simple DB helpers (dummy)
export async function getAllCompanies() {
  // return await Company.find();
  return [{ id: "1", name: "Demo Company" }];
}

export async function getCompanyById(id: string) {
  // return await Company.findById(id);
  return { id, name: "Demo Company" };
}
