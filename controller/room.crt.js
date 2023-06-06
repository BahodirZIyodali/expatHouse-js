import { deleteRoom, getRoom, getRooms, postRoom, putRoom } from "../models/models.js";

const get_room = async (req, res) => {
    try {
      const { id } = req.params;
  
      res.json(await getRoom(id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
  

  const create_room = async (req, res) => {
    try {
      const { room, price, kv, complex_id } = req.body;
      res.json(await postRoom(room, price, kv, complex_id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
  const get_rooms = async (req, res) => {
      try {
        res.json(await getRooms());
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    };
  

  
  const delete_room = async (req, res) => {
    try {
      const { id } = req.params;
  
      res.json(await deleteRoom(id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };


  const update_room = async (req, res) => {
    try {
      const { id } = req.params;
      const {  room,kv, price } = req.body;
      res.json(await putRoom( room,kv,price,id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
  

  export {get_room,get_rooms,delete_room,create_room,update_room}