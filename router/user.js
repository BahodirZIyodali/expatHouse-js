import express from "express";
import {get_users,get_user,delete_user,update_user}   from '../controller/user.js';

const router = express.Router();

//  bankni chiqarish uchun route
router.get("/users",get_users).get("/user/:id", get_user).delete("/user/:id",delete_user).put("/user/:id",update_user)

export default router;