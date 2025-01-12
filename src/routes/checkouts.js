import Iyzipay from "iyzipay";
import moment from "moment";
import Carts from "../db/carts";
import Users from "../db/users";
import ApiError from "../error/ApiError";
import Session from "../middlewares/Session";
import * as Checkouts from "../services/iyzico/methods/checkouts";
import * as Cards from "../services/iyzico/methods/cards";
import nanoid from "../utils/nanoid";
import { CompletePayment } from "../utils/payments";

export default (router) => {
    //CHECKOUTS FORM COMPLETE PAYMENT
    router.post("/checkouts/complete/payment", async (req, res)=>{
        let result = await Checkouts.getFormPayment({
            locale: "tr",
            conversationId: nanoid(),
            token: req.body.token
        });
        await CompletePayment(result);
        res.json(result);
    })
    
}