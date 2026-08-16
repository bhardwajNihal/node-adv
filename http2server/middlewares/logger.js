import fs from "fs";

// middleware loggers 
// logs info about the incoming requests in the file logs.txt

export const loggerMiddleware = (req, res, next) => {

    const url = req.url;
    const method = req.method;
    const log = `[${Date.now()} ${url} ${method}] `
    fs.appendFileSync('./logs.txt', log );

    next();         // passes the controller to next middleware or route

}