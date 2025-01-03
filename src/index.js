import "express-async-errors";
import dotenv from "dotenv";
import config from "./config.js";
import express from "express";
import logger from "morgan";
import https from"https";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import GenericErrorHandler from "./middlewares/GenericErrorHandler.js";
import ApiError from "./error/ApiError.js";

const envPath = config?.production
    ?"./env/.prod"
    :"./env/.dev"

dotenv.config({
    path: envPath
})


const app = express();

app.use(logger(process.env.LOGGER))

//Tarayıcıdan farklı yerlerden istek atilinca bizim sunucumuzdan gerçekleştiriyor.
//Sadece tarayıcıları ilgilendiren bir durum. 
app.use(helmet());
app.use(cors({
    origin:"*"
}))

app.use(express.json({
    limit: "1mb"
}))

app.use(express.urlencoded({extended:true}));

app.use("/",(req,res)=>{
    throw new ApiError("Bir hata oluştu", 404, "somethingWrong")
    res.json({
        test:1
    })
})

app.use(GenericErrorHandler);


 if(process.env.HTTPS_ENABLED =="true"){
    const key = fs.readFileSync(path.join(__dirname, "./certs/key.pem")).toString();
    const cert = fs.readFileSync(path.join(__dirname, "./certs/cert.pem")).toString();

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app);

    server.listen(process.env.PORT,()=>{
    console.log("Express uygulamamız "+process.env.PORT+" üzerinden çalışmaktadır")
    })

} else {
    app.listen(process.env.PORT,()=>{
    console.log("Express uygulamamız "+process.env.PORT+" üzerinden çalışmaktadır")
    })
}


