import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../modules/book/book.controller.js";
import { AuthGuard, RoleGuard } from "../modules/auth/auth.middleware.js";

const router = express.Router();

router.get("/", AuthGuard, getBooks);

router.get("/:id", AuthGuard, getBook);

//The slug is for findone method not for id where it will work
//router.get("/:slug", getBook);

router.post("/create", AuthGuard, createBook);

router.put("/:id", AuthGuard, updateBook);

router.delete("/delete", AuthGuard, deleteBook);

export default router;
