

// entry point to the project
import express from "express"
import { userRouter } from "./routes/user.routes.js";

const app = express()
app.use(express.json());



app.use("/user", userRouter)

app.listen(3000, () => {

    console.log("server active at port 3000!");
    
})