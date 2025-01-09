import ApiError from "../error/ApiError";
import * as Cards from "../services/iyzico/methods/cards";
import Users from "../db/users";
import nanoid from "../utils/nanoid";
import Session from "../middlewares/Session";
import { parseInt } from "lodash";

export default(router) =>{
    //Kart ekleme
    router.post("/cards", Session, async(req, res)=> {
        const {card } = req.body;
        console.log({
            locale: req.user.locale,
            conversationId: nanoid(),
            email: req.user.email,
            externalId: nanoid(),
            ...req.user?.cardUserKey && {
                cardUserKey: req.user.cardUserKey
            },
            card: card
        })
        let result = await Cards.creatUserCard({
            locale: req.user.locale,
            conversationId: nanoid(),
            email: req.user.email,
            externalId: nanoid(),
            ...req.user?.cardUserKey && {
                cardUserKey: req.user.cardUserKey
            },
            card: card
        })
        if(!req.user.cardUserKey){
            if(result?.status ==="success" && result?.cardUserKey){
                const user = await Users.findOne({
                    _id: req.user?._id
                });
                user.cardUserKey = result?.cardUserKey;
                await user.save()
            }
        }
        res.json(result)
    })



    //Kart okuma
    router.get("/cards", Session,  async(req, res)=> {
        if(!req.user?.cardUserKey){
            throw new ApiError("User has no credit card", 403, "userHasNoCard");
        }
        let cards = await Cards.getUserCard({
            locale: req.user.locale,
            conversationId: nanoid(),
            cardUserKey: req.user?.cardUserKey
        })

        res.status(200).json(cards);
    })



    //Kart silme - token
    router.delete("/cards/delete-by-token", Session, async(req, res)=> {
        const {cardToken} = req.body;
        if(!cardToken){
            throw new ApiError("Card token is required", 400, "cardTokenRequired");
        }
        let deleteResult = await Cards.deleteUserCard({
            locale: req.user.locale,
            conversationId : nanoid(),
            cardUserKey: req.user?.cardUserKey,
            cardToken: cardToken
        })
        res.status(200).json(deleteResult)
    })



    //Kart silme - index
    router.delete("/cards/:cardIndex/delete-by-index", Session, async(req, res)=> {
        if(!req.params?.cardIndex){
            throw new ApiError("Card Index is required", 400, "cardIndexRequired");
        }
        let cards = await Cards.getUserCard({
            locale: req.user.locale,
            conversationId : nanoid(),
            cardUserKey: req.user?.cardUserKey
        })
        const index = parseInt(req.params?.cardIndex);
        if(index >= cards?.cardDetails.length){
            throw new ApiError("Card doesnt exists, check index number",400, "cardIndexInvalid");
        }
        const {cardToken}= cards?.cardDetails[index]
        let deleteResult = await Cards.deleteUserCard({
            locale: req.user.locale,
            conversationId : nanoid(),
            cardUserKey: req.user?.cardUserKey,
            cardToken: cardToken
        })
        res.json(deleteResult);
    })

}
