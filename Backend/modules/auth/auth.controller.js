import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { JWT_KEY } from "../../config/variables.js";

export const signup = async (request, response) => {
  try {
    let { name, email, password, role } = request.body;
    // Check if user has an account
    let user = await User.findOne({ email });
    if (user) return response.status(400).send("User already exists");
    // Hashing password
    let hashedPassword = await bcrypt.hash(password, 10);
    // Saving user in database
    user = await User.create({ name, email, password: hashedPassword, role });
    response.send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

export const login = async (request, response) => {
  let { email, password } = request.body;
  // Check if user has an account
  let user = await User.findOne({ email });
  if (!user) return response.status(400).send("User doesn't have an account");
  // Compare passwords
  let isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return response.status(400).send("Password is incorrect");
  // Generate token
  let id = user._id;
  let token = jwt.sign({ id }, JWT_KEY, {
    //expiresIn: "10s",
    expiresIn: "7d",
  });
  // Respond
  response.send({
    token,
    message: "Logged in successfully",
  });
};
