import { deleteUser, getUser, getUsers, putUser } from "../models/models.js";
import bcrypt from 'bcrypt'
const get_user = async (req, res) => {
    try {
      const { id } = req.params;
      const result =await getUser(id)
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
  


  const get_users = async (_, res) => {
      try {
        const result =await getUsers()
        res.json(result);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    };
  

  
  const delete_user = async (req, res) => {
    try {
      const { id } = req.params;
      const result =await deleteUser(id)
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };



  const update_user = async (req, res) => {
    try {
      const { id } = req.params;
      const { user_name, email, user_password } = req.body;
      
      // Hash the new password using bcrypt
      const hashedPassword = await bcrypt.hash(user_password, 10);
  
      const result = await putUser(user_name, hashedPassword, email, id);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };

  export{get_user,get_users,delete_user,update_user}
  
