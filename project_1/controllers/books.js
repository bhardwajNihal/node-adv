// defining controllers
// this time with db

import { authorsTable } from "../models/authors.model.js";
import { booksTable } from "../models/books.model.js";
import { db } from "../src/db/index.js";


// to get all books
async function getAllBooks(req, res) {
    
    const books = await db.select().from(booksTable);

    return res.status(200).send(books);
}

// to get books by name
async function getBookByName(req, res) {
    
    const {name} = req.body;

    const book = await db.select().from(booksTable).where(eq(booksTable.name == name));

    if(!book) return res.status(404).send("book not found!");

    return res.status(200).send(book);
}


// to get books by authorname
async function getBookByName(req, res) {
    
    const {authorName} = req.body;

    // find the authorId 1st
    const author = await db.select().from(authorsTable).where(eq(authorsTable.name == authorName));
    
    if(!author) res.status(400).send("Author not found!")

    const book = await db.select().from(booksTable).where(eq(booksTable.authorId == author.id));

    if(!book) return res.status(404).send("book not found!");

    return res.status(200).send(book);
}