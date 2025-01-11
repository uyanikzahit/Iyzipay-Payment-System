import { Types } from "mongoose";
import PaymentSucces from "../db/payment-success";
import PaymentFailed from "../db/payment-failed";
import Carts from "../db/carts";

const {ObjectId} = Types;

export const CompletePayment = async (result) => {
    if(result?.status === "success") {
        await Carts.updateOne({_id: ObjectId(result?.basetId)}, {$set:{
            completed:true
        }})
        await PaymentSucces.create({
            status: result.status,
            cartId: result?.basetId,
            conversationId: result?.conversationId,
            currency: result?.currency,
            paymentId: result?.paymentId,
            price: result?.price,
            paidPrice: result?.paidPrice,
            itemTransaction: result?.itemTransaction.map(item => {
                return{
                    itemId: item?.itemId,
                    paymentTransactionId: item?.paymentTransactionId,
                    price: item?.price,
                    paidPrice: item?.paidPrice
                }
            }),
            log: result
        })
    }else {
        await PaymentFailed.create({
            status: result?.status,
            conversationId: result?.conversationId,
            errorCode: result?.errorCode,
            errorMessage: result?.errorMessage,
            log: result
        })
    }
}
