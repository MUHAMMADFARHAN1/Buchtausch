import User from "../../models/User.js";
import { JWT_KEY } from "../../config/variables.js";
import jwt from "jsonwebtoken";

//Basic fetching
export const getProfile = async (request, response) => {
  try {
    // //let userId = request.headers.authorization;
    let token = request.headers.authorization;
    // // Decoding token
    let decoded = jwt.verify(token, JWT_KEY);
    // // Check if user has an account
    let name = await User.findById(decoded.id);
    console.log(name);

    // let Users = await User.find();
    return response.send(name);
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};
