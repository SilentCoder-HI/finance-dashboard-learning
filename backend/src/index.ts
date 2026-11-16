import express from "express"
import type { Request, Response } from "express"
import { authRoutes } from "./auth/auth.js"
import cors from "cors";
import { connectDB } from "./db/db.js";
import routerCompany from "./modules/company/company.routes.js";
import routerUsers from "./modules/users/users.routes.js";
import cookieParser from "cookie-parser";

const app = express()
const port = 2000
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello Server is running" })
})

app.use("/api/companies/",routerCompany);

app.use("/api/users", routerUsers);

app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is runnig at a http://localhost:${port}`)
})