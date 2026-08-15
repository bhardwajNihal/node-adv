import http from 'http'

const server = new http.createServer( (req, res) => {

    let date = Date.now();
    console.log("req recieved at : ", date);
    console.log(req.url);

    switch (req.url) {
        case "/home":
            return res.end("you are at home!")
            break;
    
        case "/about":
            return res.end("about page")
            break;
        default:
            res.writeHead(404)
            return res.end("you are lost")
            break;
    }
    

    res.end("response!!!")
    

});



server.listen(3001, () => {
    console.log(
        "server active on port 3001 !"
    );
    
})