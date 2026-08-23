// signup and login routes

import express from 'express';
import { z} from "zod"
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import bcrypt from "bcrypt"
import { eq } from 'drizzle-orm';
import jwt from "jsonwebtoken"


export const authRouter = express.Router();

authRouter.post("/signup", async(req, res) => {

    // take the req.body, validate it using zod, if validated --> destructure it,and proceed
    console.log(req.body);
    
    const validInput = z.object({
        name : z.string().nonempty(), 
        email : z.email(), 
        password : z.string().min(3)
    })

    const validateInput = validInput.safeParse(req.body);

    if(!validateInput.success) return res.status(400).json({    // as path returns an array
        error : validateInput.error.issues.map((issue) => ({[issue.path[0]]: issue.message}))
    })

    // once input is validated, destructure and make an entry to db

    const {name, email, password} = req.body;

    // check if email already exist
    const emailExists = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(emailExists.length) return res.status(400).json({
        message : "email already exists!"
    })

    // hash password
    const hashedPassword = await bcrypt.hash(password,10);

    await db.insert(usersTable).values({
        name, email,
        password : hashedPassword
    })

    res.status(201).json({
        message : "user signed up!"
    })

})


authRouter.post("/login", async(req, res) => {

    // validate input
    const validLoginInput = z.object({
        email : z.email().nonempty(),
        password : z.string().nonempty()
    })

    const isInputValid = validLoginInput.safeParse(req.body);

    if(!isInputValid.success) return res.status(400).json({    // as path returns an array
        error : isInputValid.error.issues.map((issue) => ({[issue.path[0]]: issue.message}))
    })

    // once input validated
    const {email, password} = isInputValid.data;        // can also fetch directly from req.body

    // check if user is registered
    const [foundUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(!foundUser) return res.status(400).json({    
        message : "user not registered!"
    })


    // validate password
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if(!isPasswordCorrect) return res.status(400).json({  
        message : "incorrect password!"
    })

    // finally, sign a token and return back to user

    const token = jwt.sign({
        id : foundUser.id
    }, "secret123")
    

    res.status(200).json({
        token
    })
})