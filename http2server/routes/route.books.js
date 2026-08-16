import express from 'express';
// import controllers
import { getAllBooks, getBookById, addBook} from '../controllers/books.controllers.js'

export const bookRouter = express.Router();

// all book related routes in here

bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getBookById )
bookRouter.post("/", addBook)