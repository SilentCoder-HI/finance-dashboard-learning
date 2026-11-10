import express from "express"
import type { Request, Response } from "express"
import { allInvoices, getInvoicesByCustomer } from "./data/invocies.js"
import { authRoutes } from "./auth/auth.js"
import cors from "cors";




const app = express()
const port = 2000
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello Server is running" })
})

app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is runnig at a http://localhost:${port}`)
})