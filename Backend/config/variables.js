import dotenv from "dotenv";
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const JWT_KEY = process.env.JWT_KEY;
