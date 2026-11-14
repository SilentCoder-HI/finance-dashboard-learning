export interface CompanySeed {
  id: string;
  name: string;
  industry: string;
  website: string;
}

export interface UserSeed {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "superadmin" | "admin" | "accountant" | "viewer";
  companyId: string | null;
  isActive: boolean;
}

export const companies: CompanySeed[] = [
  { id: "c1", name: "TechVision", industry: "Software", website: "https://techvision.test" },
  { id: "c2", name: "GreenLeaf", industry: "Retail", website: "https://greenleaf.test" },
  { id: "c3", name: "BluePeak", industry: "Finance", website: "https://bluepeak.test" },
  { id: "c4", name: "UrbanNest", industry: "Real Estate", website: "https://urbannest.test" },
  { id: "c5", name: "MediCore", industry: "Healthcare", website: "https://medicore.test" },
  { id: "c6", name: "EduSpark", industry: "Education", website: "https://eduspark.test" },
  { id: "c7", name: "AgroNova", industry: "Agriculture", website: "https://agronova.test" },
  { id: "c8", name: "TravelEase", industry: "Travel", website: "https://travelease.test" },
  { id: "c9", name: "FoodHive", industry: "Food", website: "https://foodhive.test" },
  { id: "c10", name: "AutoPilot", industry: "Automotive", website: "https://autopilot.test" },
];

export const users: UserSeed[] = [
  { id: "u-super", name: "Platform Super Admin", username: "superadmin", email: "superadmin@platform.test", role: "superadmin", companyId: null, isActive: true },
  ...companies.flatMap((c) => [
    { id: `u-${c.id}-admin`, name: `${c.name} Admin`, username: `admin@${c.id}`, email: `admin@${c.id}.test`, role: "admin" as const, companyId: c.id, isActive: true },
    { id: `u-${c.id}-accountant`, name: `${c.name} Accountant`, username: `accountant@${c.id}`, email: `accountant@${c.id}.test`, role: "accountant" as const, companyId: c.id, isActive: true },
    { id: `u-${c.id}-viewer`, name: `${c.name} Viewer`, username: `viewer@${c.id}`, email: `viewer@${c.id}.test`, role: "viewer" as const, companyId: c.id, isActive: true },
  ]),
];
