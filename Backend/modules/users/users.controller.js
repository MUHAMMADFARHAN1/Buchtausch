import User from "../../models/User.js";

//Basic fetching
export const getAllusers = async (request, response) => {
  try {
    let Users = await User.find();
    return response.send(Users);
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};
