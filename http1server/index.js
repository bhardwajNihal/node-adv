import http from 'http';
import fs from "fs";

const server = new http.createServer((req, res) => {

    const url = req.url;
    const method = req.method; 

    let curr_logs = `[${Date.now()}] ${url} ${method}`

    fs.appendFileSync("logs.txt", `\n${curr_logs}`)
 
    switch(method){
 
        case "GET":{

            switch(url){
                case "/":
                    return res.writeHead(200).end('welcome')
                    break;
                
                case "/tweet":
                    return res.writeHead(200).end('these are all your tweets!')
                    break;
                case "/contact":
                    return res.writeHead(200).end("contact details")
                    break;
            }
        } 
            

        case "POST": {
            switch(url){
                case "/tweet":
                    return res.writeHead(201).end('your tweet was successfully created!')
            }
        }

        default : 
            res.writeHead(404).end("route don't exist!")
            

        
    }
    
})


server.listen(3000, () => {

    console.log("server listening at port 3000!!")
})