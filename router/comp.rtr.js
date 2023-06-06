import express from "express";
import { get_company,get_componies,delete_company,create_company,update_company} from "../controller/comp.ctr.js";
const router = express.Router();
//  compony routes
router.get("/companies",get_componies).get("/company/:id",get_company).delete("/company/:id",delete_company).post("/company",create_company).put("/company/:id",update_company)

export default router;