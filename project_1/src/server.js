
// entry point for the app

import express from "express"
import { bookRouter } from "../routes/book.routes.js";
import { authorRouter } from "../routes/author.routes.js";

const app = express();

app.use(express.json())

app.use("/books", bookRouter);
app.use("/authors", authorRouter);


app.listen(3000, ()=> {

    console.log("server active at port 3000");
    
})