
import { eq } from "drizzle-orm";
import { authorsTable } from "../models/authors.model.js";
import { db } from "../src/db/index.js";


// to get all books
export async function getAllAuthors(req, res) {
    
    const authors = await db.select().from(authorsTable);

    return res.status(200).send(authors);
}