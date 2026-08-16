import express from 'express';
import { loggerMiddleware } from './middlewares/logger.js';

const app = express();
app.use(express.json());            // middleware to parse json body in the request object

// importing book router
import {bookRouter} from './routes/route.books.js'
// for all /book routes, passing request to bookrouter, which further sends it to book controllers
app.use("/book", loggerMiddleware, bookRouter)



app.listen(3000, () => {

    console.log("server listening at port 3000!");
    
})