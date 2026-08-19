
// all the user routes

import express from "express"
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq, hammingDistance } from "drizzle-orm";
import bcrypt from "bcrypt"


const app = express()
app.use(express.json());

export const userRouter = express.Router();

// signup route
    // fetch user creds entered on visit from req.body
    // check if already registered, by finding if email already exists in the db
    // if not, add the entry to the db
    // password should be hashed
userRouter.post("/signup", async(req, res) => {

    const {name, email, password} = req.body;

    const founduser = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(founduser.length != 0) return res.status(400).json({
        error : "user already exists!"
    })


    // hash password
    const hashedpassword = await bcrypt.hash(password,10);
    
    // make entry to the db
    const newUser = {
        name, email,
        password : hashedpassword
    }

    const addedUser = await db.insert(usersTable).values(newUser).returning({id : usersTable.id});

    res.status(201).json({
        message : "user created!!", 
        id : addedUser[0].id
    })
})


// login route
// take the creds from the body
// check if user is registered i.e. signed up
// compare password
// respond success and a token, that the user stores as session cookies or in localstorage to be sent in subsequest requests for authorization
userRouter.post("/signin", async(req, res) => {

    const {email, password} = req.body;

    // check if user exists
    const foundUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(foundUser.length ==0) res.status(404).send("user not found!");

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, foundUser[0].password);

    if(!isPasswordCorrect) res.status(400).send("incorrect password!!");

    // finally
    // generate token and send as response
    const token = Date.now();

    res.status(200).json({
        status : "successfully logged-in!",
        token : token
    })


})
