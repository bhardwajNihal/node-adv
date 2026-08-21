// defining controllers
// this time with db

import { eq, ilike, sql } from "drizzle-orm";
import { authorsTable } from "../models/authors.model.js";
import { booksTable } from "../models/books.model.js";
import { db } from "../src/db/index.js";


// to get all books
export async function getAllBooks(req, res) {

    // if the query has a 'search' parameter
    // then find and return books, based on the matching keyword

    // for that will use an inbuild method "ilike" by the drizzle
    // where it fetches and returns data from the db, that mathches the given regex like expresion
    // for example - ilike(book.title, '%work%'), will return all the books where title has 'work' in any part of it
    
    const keyword = req.query.search;
    
    if(keyword) {

        const matchingBooks = await db
        .select()
        .from(booksTable)
        // .where(ilike(booksTable.title, `%${keyword}%`))      // pattern matching query using ilike, not efficient
        .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${keyword})`)       // efficient query using indexing 
    
        return res.status(200).send(matchingBooks)
    }
    
    // if no search parameter in the query, simply return all the books
    const books = await db.select().from(booksTable);

    return res.status(200).send(books);
}

// to get books by name
export async function getBookByTitle(req, res) {
    
    const {title} = req.params;

    const book = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.title, title))
    .rightJoin(authorsTable, eq(authorsTable.id, booksTable.authorId))

    if(book.length == 0) return res.status(404).send("book not found!");

    return res.status(200).send(book);
}


// to get books by authorname
export async function getBookByAuthor(req, res) {
    
    const {authorName} = req.params;
    console.log(authorName);
    
    // find the authorId 1st
    const author = await db.select().from(authorsTable).where(eq(authorsTable.name, authorName));
    console.log(author);
    
    if(author.length == 0) return res.status(400).send("Author not found!")
    console.log(author);

    const book = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, author[0].id))

    if(book.length==0) return res.status(404).send("book not found!");

    return res.status(200).send(book);
}


// controller to add book
export async function addBook(req, res){

    const {title, description, authorId} = req.body;
    console.log(title, description);
    
    
    if(!title || !description || !authorId) return res.status(400).send("all details are required!");

    const newBook = {
        title, description, authorId
    }

    const bookAdded = await db.insert(booksTable).values(newBook).returning({id : booksTable.id})

    return res.status(201).json({
        message : "book added !", 
        id : bookAdded[0].id
    })

}


// controller to delete a book, given it's id

export async function deleteBook(req, res) {
    
    const {bookId} = req.body;

    // find if book exists 
    const book = await db.select().from(booksTable).where(eq(booksTable.id, bookId));

    console.log(book);
    
    if(book.length == 0) return res.status(400).json("book not found!")

    const bookDeleted = await db.delete(booksTable).where(eq(booksTable.id, book[0].id)).returning({id : booksTable.id});

    return res.status(200).json({
        message : "book deleted!", 
        id : bookDeleted
    })
}