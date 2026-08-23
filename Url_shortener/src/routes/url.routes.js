// url related routes
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkLoggedIn } from '../checkLoggedIn.js';
import z from 'zod';
import { generateShortCode } from '../utils/generateShortCode.js';
import { db } from '../db/index.js';
import { urlsTable } from '../db/schema.js';
import 'dotenv/config'
import { eq } from 'drizzle-orm';

export const urlRouter = express.Router();

// // route to shorten a given url
urlRouter.post("/shorten", authMiddleware, async(req, res) => {

    // check if authenticated
    checkLoggedIn(req, res);

    // validate input
    const validInput = z.object({
        customUrl : z.string().max(100).optional(),
        originalUrl : z.url().nonempty()
    })

    const isInputValid = validInput.safeParse(req.body);

    if(!isInputValid.success) return res.status(200).json({
        error : "input invalid!"
    })

    // if valid
    const {customUrl, originalUrl} = isInputValid.data;

    // if customUrl not provided generated a random one
    let shortCode;
    if(!customUrl) shortCode = generateShortCode();
    else shortCode = customUrl;         // else use the custom url provided

    const result = await db.insert(urlsTable).values({
        shortCode : `${process.env.BASE_URL}/${shortCode}`,
        originalUrl,
        userId : req.user.id
    }).returning({
        shortCode : urlsTable.shortCode,
        originalUrl : urlsTable.originalUrl,
        userId : urlsTable.userId
    })

    res.status(201).json({
        message : "url shortened!",
        details : result
    })

})


// route to redirect to the original url, given a short url
// no auth required, as shorturl should be accessed by public
urlRouter.get("/:shorturl", async (req, res) => {
    
    const code = req.params.shorturl;

    // console.log(code);
    // console.log(`${process.env.BASE_URL}/${code}`);
    
    
    // search for the shortcode
    // if exists, return the original url

    const result = await db.select().from(urlsTable).where(eq(urlsTable.shortCode, `${process.env.BASE_URL}/${code}`))

    if(result.length==0) return res.status(400).json({
        error : "url not found!"
    })

    const originalUrl = result[0].originalUrl;

    return res.redirect(originalUrl)

    
})


// easy cruds

// // get all urls created by the logged-in user✅
// urlRouter.get("/urls", async(req, res) => {

// })


// // delete a url✅
// urlRouter.delete("/urls/:url", (req, res) => {

// } )
