// url related routes
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const urlRouter = express.Router();

// // route to shorten a given url
urlRouter.post("/shorten", authMiddleware, async(req, res) => {

     const user = req.user;

     return res.json(user);
    
})


// // route to redirect to the original url, given a short url
// urlRouter.get("/:shorturl", (req, res) => {
    
// })


// // get all urls created by the logged-in user
// urlRouter.get("/urls", (req, res) => {

// })


// // delete a url
// urlRouter.delete("/urls/:url", (req, res) => {

// } )
