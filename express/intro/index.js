import express from "express"

const app = express();

app.get("/", (req, res) => {

    console.log("request recieved: ", req);

    res.send("hello from the express server!!")
    
})


app.get("/contact-us", (req, res) => {

    res.status(200).json({
        email : "nihal123@abc.com",
        ph : 1234567
    })
})

app.post('/tweet', (req, res) => {

    res.status(201).json({
        message : "tweet created successfully!!"
    })
})


app.listen(3000)