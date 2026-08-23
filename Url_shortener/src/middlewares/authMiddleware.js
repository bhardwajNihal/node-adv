import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";


// middleware to validate token and add user details to the request object

export const authMiddleware = async(req, res, next) => {

    // extract headers
    const authHeader = req.headers["authorization"];    // key is always normalized to lowercase
    // console.log(authHeader);
    

    if(!authHeader) return next();
    if(!authHeader.startsWith("Bearer")) return next();  // check if bearer token exists in the request headers

    // if so, extract token
    const token = authHeader.split(" ")[1];
    // console.log(token);
    
    
    // verify it against the jwt secret 
        let decodedToken;

        try {
            decodedToken = jwt.verify(token, "secret123");      // as it not always return a boolean value, can throw error if token is not valid
        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
        // console.log("------------------", decodedToken);
        
    
    //if valid, fetch user details and attach it to the request object
    if(!decodedToken) return res.status(201).json({
        message : "User not logged in!"
    })


    // token once validated, extract the user id, then fetch the complete user details and attach it to the request object
    const userId = decodedToken.id;
    // console.log("user id : ",userId);
    
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId))
    // console.log(user);
    
    req.user = user;
    next();

    // if at any stage validation fails, simply call the next()
        // as in the subsequent route, if request is not attached with the user object
        // that will mean that the token is not validated
}