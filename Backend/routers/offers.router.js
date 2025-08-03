import express from "express";
import {
  getOffers,
  getOffer,
  createOffer,
  updateOffer,
  getAllOffers,
  deleteOffer,
} from "../modules/offers/offers.controller.js";
import { AuthGuard, RoleGuard } from "../modules/auth/auth.middleware.js";

const router = express.Router();

router.get("/", AuthGuard, getOffers);

router.get("/all", AuthGuard, getAllOffers);

router.get("/:id", AuthGuard, getOffer);

//The slug is for findone method not for id where it will work
//router.get("/:slug", getBook);

router.post("/create", AuthGuard, createOffer);

router.put("/:id", AuthGuard, updateOffer);

router.delete("/delete/:id", AuthGuard, deleteOffer);

export default router;
