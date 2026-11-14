// app.ts - wire routes together (dummy)
import express from "express";
import companyRoutes from "./modules/company/company.routes";
import userRoutes from "./modules/users/users.routes";

const app = express();
app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api", userRoutes);

export default app;
