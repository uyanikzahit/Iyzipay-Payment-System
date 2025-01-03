import dotenv from "dotenv";
import config from "./config.js";

import express from "express";
import logger from "morgan";
import https from"https";
import fs from "fs";
import path from "path";

const envPath = config?.production
    ?"./env/.prod"
    :"./env/.dev"

dotenv.config({
    path: envPath
})


const app = express();

app.use(logger(process.env.LOGGER))

app.use(express.json({
    limit: "1mb"
}))

app.use(express.urlencoded({extended:true}));



 if(process.env.HTTPS_ENABLED =="true"){
    const key = fs.readFileSync(path.join(__dirname, "./certs/key.pem")).toString();
    const cert = fs.readFileSync(path.join(__dirname, "./certs/cert.pem")).toString();

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app);

    server.listen(process.env.PORT,()=>{
    console.log("Express uygulamamız"+process.env.PORT+"üzerinden çalışmaktadır")
    })

} else {
    app.listen(process.env.PORT,()=>{
    console.log("Express uygulamamız"+process.env.PORT+"üzerinden çalışmaktadır")
    })
}


