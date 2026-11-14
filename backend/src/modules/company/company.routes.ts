import { Router } from "express";

const routerCompany = Router();


routerCompany.get("/:companyId", async (req, res) => {
  const { companyId } = req.params


  
});

export default routerCompany;
