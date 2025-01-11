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
    //FİYATA GÖRE TAKSİT KONTROLÜ
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


    //SEPETİN FİYATINA GÖRE TAKSİT KONTROLÜ

    router.post("/installments/:cartId",Session,async(req, res)=>{
        const {binNumber} = req.body;
        const {cartId} = req.params;
        if(!cartId) {
            throw new ApiError("Cart id is required", 400, "cartIdRequired");
        }
        const cart = await Carts.findOne({
            _id: new  ObjectId(cartId)
        }).populate("products", {
            _id: 1,
            price: 1 
        })



        
        const price = cart.products.map((product) => product.price).reduce((a,b) => a+b,0);
        if(!binNumber || !price) {
            throw new ApiError("Missing parameters", 400, "missingParameters");
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

