import Iyzipay from "iyzipay";
import moment from "moment";
import Carts from "../db/carts";
import Users from "../db/users";
import ApiError from "../error/ApiError";
import Session from "../middlewares/Session";
import * as PaymentsThreeDS from "../services/iyzico/methods/threeds-payments";
import * as Cards from "../services/iyzico/methods/cards";
import nanoid from "../utils/nanoid";
import { CompletePayment } from "../utils/payments";

export default (router) => {
    router.post("/threeds/payments/complete", async (req, res)=> {
        if(!req.body?.paymentId){
            throw new ApiError("Payment id is required", 400, "paymentIdRequired");
        }
        if(req.body.status !== "success"){
            throw new ApiError("Payment cant be starred because initialization is failed", 400, "initializationFailed");
        }
        const data = {
            locale: "tr",
            conversationId: nanoid(),
            paymentId: req.body.paymentId,
            conversationData: req.body.conversationData
        }
        const result = await PaymentsThreeDS.completePayment(data);
        await CompletePayment(result);
        res.status(200).json(result);

    })


    //YENİ BİR KARTLA ÖDEME OLUŞTUR VE KARTI KAYDETME
    router.post("/threeds/payments/:cartId/with-new-card", Session, async (req, res)=>{
        const {card} = req.body;
        if(!card) {
            throw new ApiError("Card is required", 400, "cardRequired");
        }
        if (!req.params?.cartId) {
            console.error("Cart ID is missing:", req.params);
            throw new ApiError("Cart id is required", 400, "cartIdRequired");
        }

        const cart = await Carts.findOne({_id: req.params?.cartId}).populate("buyer").populate("products");
        if (!cart) {
            console.error("Cart not found for ID:", req.params.cartId);
            throw new ApiError("Cart not found", 404, "cartNotFound");
        }

        if(cart?.completed){
            throw new ApiError("Cart is completed", 400, "cartCompleted");
        }

        card.registerCard = "0";
        const paidPrice = cart.products.map((product) => product.price).reduce((a,b)=> a+b, 0);
        
        const data = {
            locale: req.user.locale,
            conversationId: nanoid(),
            price: paidPrice,
            paidPrice: paidPrice,
            currency: Iyzipay.CURRENCY.TRY,
            installments:'1',
            basketId: String(cart?._id),
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: `{process.env.END_POINT}/threeds/payments/complete`,
            paymentCard: card,
            buyer: {
                id: String(req.user._id),
                name: req.user?.name,
                surname: req.user?.surname,
                gsmNumber: req.user?.phoneNumber,
                email: req.user?.email,
                identityNumber: req.user?.identityNumber,
                lastLoginDate: moment(req.user?.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationDate: moment(req.user?.createddAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationAddress: req.user?.address,
                ip: req.user?.ip,
                city: req.user?.city,
                country: req.user?.country,
                zipCode: req.user?.zipCode,
            },
            shippingAddress:{
                contactName:  req.user?.name+" "+ req.user?.surname,
                city: req.user?.city,
                country: req.user?.country,
                address: req.user?.address,
                zipCode: req.user?.zipCode,

            },
            billingAddress:{
                contactName:req.user?.name+" "+ req.user?.surname,
                city: req.user?.city,
                country: req.user?.country,
                address: req.user?.address,
                zipCode: req.user?.zipCode,

            },
            basketItems: cart.products.map((product)=> {
                return{
                    id: String(product?._id),
                    name: product?.name,
                    category1: product.categories[0], 
                    category2: product.categories[1],
                    itemType: Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
                    price: product?.price
                }
            })
        }

        // console.log(data);
        // res.json({test:1})



        let result = await PaymentsThreeDS.initializePayment(data);
        const html = Buffer.from(result?.threeDSHtmlContent, 'base64').toString();
        res.send(html);
    }) 

}