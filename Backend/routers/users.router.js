import express from "express";
import { getAllusers } from "../modules/users/users.controller.js";
import { AuthGuard, RoleGuard } from "../modules/auth/auth.middleware.js";

const router = express.Router();

// router.get("/", getProducts);

router.get("/", AuthGuard, RoleGuard("admin"), getAllusers);

export default router;
