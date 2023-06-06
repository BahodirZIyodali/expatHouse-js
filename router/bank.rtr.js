import express from "express";
import {get_bank,get_banks,delete_bank,update_bank,create_bank}   from '../controller/bank.ctr.js';

const router = express.Router();

//  bankni chiqarish uchun route
router.get("/banks",get_banks).get("/bank/:id", get_bank).delete("/bank/:id",delete_bank).post("/bank",create_bank).put("/bank/:id",update_bank)

export default router;