import express from "express";
import {addBook, deleteBook, getAllBooks, getBookByAuthor, getBookByTitle} from "../controllers/books.js"

export const bookRouter = express.Router();


bookRouter.get("/", getAllBooks);
bookRouter.get("/:title", getBookByTitle);
bookRouter.get("/author/:authorName", getBookByAuthor)
bookRouter.post("/", addBook)
bookRouter.delete("/", deleteBook)