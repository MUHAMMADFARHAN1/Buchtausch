import express from "express";
import {
  getProfile,
  updateProfile,
} from "../modules/profile/profile.controller.js";
import { AuthGuard, RoleGuard } from "../modules/auth/auth.middleware.js";

const router = express.Router();

// router.get("/", getProducts);

router.get("/", AuthGuard, getProfile);

router.put("/update", AuthGuard, updateProfile);

export default router;
