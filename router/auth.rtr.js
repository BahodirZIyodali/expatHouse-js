import express from "express";
import { admin_register,register,login} from "../controller/auth.ctr.js";
const router = express.Router();

//  auth qilish uchun route
router.post("/adminregister",admin_register).post("/register",register).post("/login",login)


export default router;