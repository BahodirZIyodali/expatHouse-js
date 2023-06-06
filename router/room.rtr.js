import express from "express";
import { get_room,get_rooms,create_room,delete_room, update_room } from "../controller/room.crt.js";
const router = express.Router();


router.get("/rooms",get_rooms).get("/room/:id",get_room).delete("/room/:id",delete_room).post("/room",create_room).put("/room/:id",update_room)

export default router;