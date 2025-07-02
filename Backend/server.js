import express from "express";
//import authRouter from "./routers/auth.router.js";
import bookRouter from "./routers/book.router.js";
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/users.router.js";
import { startDatabase } from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/Books", bookRouter);
app.use("/users", userRouter);

app.listen(5001, async () => {
  await startDatabase();
  console.log("Server is running");
});
