import express from "express";
//import authRouter from "./routers/auth.router.js";
import bookRouter from "./routers/book.router.js";
import authRouter from "./routers/auth.router.js";
//import userRouter from "./routers/users.router.js";
import userProfile from "./routers/profile.router.js";
import userOffers from "./routers/offers.router.js";
import userInterests from "./routers/interests.router.js";
import { startDatabase } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/Books", bookRouter);

app.use("/Profile", userProfile);

app.use("/MyOffers", userOffers);
// app.use("/AllOffers", userRouter);
app.use("/Interests", userInterests);

app.listen(PORT, async () => {
  await startDatabase();
  console.log("Server is running");
});
