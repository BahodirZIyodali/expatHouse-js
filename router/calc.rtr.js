import express from "express";
import get_calc   from '../controller/calc.ctr.js';
const router = express.Router();

//  cankulator
router.get("/calc",get_calc)


export default router;