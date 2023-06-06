import { sign } from "../utils/jwt.js";
import bcrypt from 'bcrypt'
import {userLogin,userRegister,adminRegister} from '../models/models.js'


const register = async (req, res) => {
  try {
    const { user_name, user_password, email } = req.body;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Add the new user to the authentication database
    const user_id = await userRegister(user_name, email, hashedPassword);
    

    // Return a success response
    return res.json({
      token: sign({ user_id }),
      status: 'ok',
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const admin_register = async (req, res) => {
  try {
    const { user_name, user_password, email ,role} = req.body;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Add the new user to the authentication database
    const admin_id=await adminRegister(user_name, email, hashedPassword,role);
    

    // Return a success response
    return res.json({
      token: sign({ admin_id }),
      status: 'ok',
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const login = async (req, res) => {
  try {
    const { email, user_password } = req.body;
    // Retrieve all users from the authentication database
    const allUser = await userLogin(email);
    console.log(email);
    // Find the user with the matching login
    const foundUser = allUser.find((e) => e.email === email);

    if (foundUser) {
      // Compare the password with the hashed password in the database
      const match = await bcrypt.compare(user_password, foundUser.user_password);
      if (match) {
        // If a matching user is found, sign a JWT token with the user's information
        return res.json({
          token: sign({
            user_id: foundUser.user_id,
          }),
          // Return a success status
          status: "ok",
        });
      }
    }
    // If no matching user is found or the password doesn't match, return a 401 Unauthorized status
    res.status(401);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};



export {login,register,admin_register}





