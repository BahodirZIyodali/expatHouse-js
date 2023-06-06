import express from "express";
import { get_complex,get_complexes,create_complex,delete_complex, update_complex } from "../controller/complex.ctr.js";
const router = express.Router();

//  complex routes
router.get("/complex",get_complexes).get("/complex/:id",get_complex).delete("/complex/:id",delete_complex).post("/complex",create_complex).put("/complex/:id",update_complex)


export default router;