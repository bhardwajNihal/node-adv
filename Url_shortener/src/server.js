import express from "express"
import { authRouter } from "./routes/auth.routes.js";
import { urlRouter } from "./routes/url.routes.js";
const app = express();
app.use(express.json());


app.use("/auth", authRouter);
app.use("/", urlRouter );

app.listen(3000, () => {

console.log("server listening on port 3000!");
})
