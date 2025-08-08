import express from "express";
import {
  getInterests,
  fetchinterests,
  showinterest,
  acceptinterest,
  // deleteinterest,
} from "../modules/interests/interests.controller.js";
import { AuthGuard, RoleGuard } from "../modules/auth/auth.middleware.js";

const router = express.Router();

// router.get("/", AuthGuard, getOffers);

// get all interests for an offer with offerid
router.get("/:offerid", AuthGuard, getInterests);

//get  interests with interest id
router.get("/details/:id", AuthGuard, fetchinterests);

//The slug is for findone method not for id where it will work
//router.get("/:slug", getBook);

//show interest with an offer id
router.post("/showInterest/:offer", AuthGuard, showinterest);

//accept interst shown by other user which will cause deletion
router.delete("/accept/:interestid", AuthGuard, acceptinterest);

// router.put("/:id", AuthGuard, updateOffer);

//router.delete("/fetch/:id", AuthGuard, deleteinterest);

export default router;
