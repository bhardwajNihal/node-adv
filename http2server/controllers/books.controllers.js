import { BOOKS } from "../models/books.model.js";

// controllers for server related operations and db communication

export const getAllBooks = (req, res) => {

    res.send(BOOKS);

}

export const getBookById = (req, res) => {

    const id = parseInt(req.params.id);

    const book = BOOKS.find(b => b.id == id);

    if(!book) return res.status(400).send('book not found!');

    return res.status(200).send(book);

}

export const addBook = (req, res) => {

    const {name, author} = req.body;

    BOOKS.push({
        id : BOOKS.length+1,
        name : name, 
        author : author
    })

    res.status(201).json({
        message : "book added successfully!",
        details : BOOKS[BOOKS.length-1]
    })
}