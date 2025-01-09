import {Types} from "mongoose";
import moment from "moment";
import Session from "../middlewares/Session";
import nanoid from "../utils/nanoid";
import * as Installments from "../services/iyzico/methods/installments";
import ApiError from "../error/ApiError";
import Carts from "../db/carts";
import { route } from "express/lib/router";

const {ObjectId} = Types;

export default (router) => {
    router.post("/installments", Session, async(req, res)=>{
        const {binNumber, price} = req.body;
        if(!binNumber || !price){
            throw new ApiError("Missing Parameters", 400, "missingparameters");
        }
        const result = await Installments.checkInstallment({
            locale: req.user.locale,
            conversation: nanoid(),
            binNumber: binNumber,
            price: price
        })
        res.json(result);
    })
}