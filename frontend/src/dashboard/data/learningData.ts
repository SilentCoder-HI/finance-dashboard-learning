export type DayStatus = "completed" | "in-progress" | "upcoming";

export interface LearningDay {
  day: number;
  title: string;
  phase: string;
  objectives: string[];
  topics: string[];
  task: string;
  status: DayStatus;
}

export const phases = [
  "Frontend fundamentals",
  "Advanced React and state management",
  "Backend development",
  "Database architecture",
  "Authentication and authorization",
  "Advanced frontend and performance",
  "System design and scalability",
  "Production engineering and deployment",
];

export const learningDays: LearningDay[] = [
  { day: 1, title: "Invoice dashboard foundation", phase: phases[0], objectives: ["Build dashboard layout", "Render typed data"], topics: ["React", "TypeScript", "MUI"], task: "Create invoice table and charts", status: "completed" },
  { day: 2, title: "Sorting and charts", phase: phases[0], objectives: ["Controlled sorting", "Monthly aggregation"], topics: ["TanStack Table", "Recharts"], task: "Add sorting and year selector", status: "completed" },
  { day: 3, title: "Filtering and KPIs", phase: phases[0], objectives: ["Combine filters", "Derive totals"], topics: ["useMemo", "Filters"], task: "Customer invoice view", status: "completed" },
  { day: 4, title: "Redux basics", phase: phases[1], objectives: ["Global user state", "Protected pages"], topics: ["Redux Toolkit"], task: "Add auth slice", status: "completed" },
  { day: 5, title: "Invoice filtering and login", phase: phases[1], objectives: ["Customer filters", "Demo login"], topics: ["Redux", "Filtering"], task: "Connect user to invoices", status: "completed" },
  { day: 6, title: "Tailwind and design", phase: phases[5], objectives: ["Tailwind setup", "Design pass"], topics: ["Tailwind v4", "UI polish"], task: "Glassmorphism dashboard", status: "completed" },
  { day: 7, title: "Backend auth and MongoDB", phase: phases[2], objectives: ["Express API", "MongoDB"], topics: ["Node", "Mongoose", "bcrypt"], task: "Register and login", status: "in-progress" },
];
