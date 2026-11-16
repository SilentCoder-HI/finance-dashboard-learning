// company.service.ts - simple DB helpers (dummy)
import { User } from "@/model/user.js";
export async function getAllCompanies() {
  // return await Company.find();
  return [{ id: "1", name: "Demo Company" }];
}

export async function getCompanyById(id: string) {
  
}