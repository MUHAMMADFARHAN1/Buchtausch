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

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-findoneandupdate-method-925
export const updateProfile = async (request, response) => {
  // let { id } = request.params;
  console.log(request.body);
  let { city, name, email, phone } = request.body;

  // //let userId = request.headers.authorization;
  let token = request.headers.authorization;
  // // Decoding token
  let decoded = jwt.verify(token, JWT_KEY);
  console.log(decoded.id);
  console.log(request.body);

  // let body = request.body;
  await User.findOneAndUpdate(
    // { _id: decoded.id },
    { _id: decoded.id },
    { city, name, email, phone }
  );

  response.status(202).send(`Updating a Book of id: ${decoded.id} with data:}`);
  // response.status(202);
};
