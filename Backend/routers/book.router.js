import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../modules/book/book.controller.js";

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBook);

//The slug is for findone method not for id where it will work
//router.get("/:slug", getBook);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
