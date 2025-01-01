import Iyzipay from "iyzipay";
import * as Cards from "./methods/cards"; 
import nanoid from "../../utils/nanoid";
import * as Logs from "../../utils/logs";



// -----------------------------
/* a) CARDS */
// -----------------------------

const creatUserAndCard = () => {
    Cards.creatUserCard({
        locale: Iyzipay.LOCALE.TR, 
        conversationId: nanoid(),
        email: "email@email.com",
        externaId: nanoid(),
        card:{
            cardAlias: "Kredi Kartı",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030"

        }
    }).then((result) => {
        console.log(result)
        Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur",result)
    }).catch((err) =>{
        console.log(err);
        Log.logFile("1-cards-kullanıcı-ve-kart-oluştur-hata",err)
    })
}

// creatUserAndCard();



//Bir kullanıcıya yeni bir kart ekle 
const creatACardForUser = () => {
    Cards.creatUserCard({
        locale: Iyzipay.LOCALE.TR, 
        conversationId: nanoid(),
        email: "email@email.com",
        externaId: nanoid(),
        cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c',
        card:{
            cardAlias: "Kredi Kartı",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030"

        }
    }).then((result) => {
        console.log(result)
        Logs.logFile("2-cards-bir-kullanıcıya-kart-ekle",result)
    }).catch((err) =>{
        console.log(err);
        Log.logFile("2-cards-bir-kullanıcıya-kart-ekle-hata",err)
    })
}

// creatACardForUser()




//Bir kullanıcının kartlarını oku
const readCardOfAUser = () => {
    Cards.getUserCard({
        locale: Iyzipay.LOCALE.TR, 
        conversationId: nanoid(),
        cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c',

    }).then((result) => {
        console.log(result)
        Logs.logFile("3-card-bir-kullanicinin-kartlarini-oku ",result)
    }).catch((err) =>{
        console.log(err);
        Log.logFile("3-card-bir-kullanicinin-kartlarini-oku-hata",err)
    })
}
readCardOfAUser()


//Bir kullanıcının kartını sil
const deleteCardOfAUser = () => {
    Cards.deleteUserCard({
        locale: Iyzipay.LOCALE.TR, 
        conversationId: nanoid(),
        cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c',
        cardToken: '704d4d6f-adce-1b5c-1998-af963d51f90b',

    }).then((result) => {
        console.log(result)
        Logs.logFile("4-card-bir-kullanicinin-kartini-sil ",result)
    }).catch((err) =>{
        console.log(err);
        Log.logFile("4-card-bir-kullanicinin-kartini-sil-hata",err)
    })
}
// deleteCardOfAUser();