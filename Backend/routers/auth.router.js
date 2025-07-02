import express from "express";

import { AuthGuard } from "../modules/auth/auth.middleware.js";
import { login, signup } from "../modules/auth/auth.controller.js";

const router = express.Router();

// Endpoint is /auth/signup (/auth is mentioned in server.js)
// Creating Users
router.post("/signup", signup);

router.post("/login", login);

router.get("/protected", AuthGuard, (request, response) => {
  try {
    // Do the action
    console.log(request.user);
    response.send("Success");
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
});

export default router;
