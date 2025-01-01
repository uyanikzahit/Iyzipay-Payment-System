import Iyzipay, { CURRENCY } from "iyzipay";
import * as Cards from "./methods/cards"; 
import * as Installments from "./methods/installments";
import * as Payments from "./methods/payment";
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
// readCardOfAUser()


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





// -----------------------------
/* b) INSTALLMENTS */
// -----------------------------


//Bir kart ve ücretle ilgili gerçekleşebilecek taksitlerin kontrolü
const checkInstallments = () => {
    return Installments.checkInstallment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        binNumber: "55287900",
        price: "100000"
        }).then((result) => {
            console.log(result)
            Logs.logFile("5-installments-bir-kart-ve-ucret-kontrolu ",result)
        }).catch((err) =>{
            console.log(err);
            Log.logFile("5-installments-bir-kart-ve-ucret-kontrolu-hata",err)
        })
}

// checkInstallments()





// -----------------------------
/* c) NORMAL PAYMENT */
// -----------------------------


//Kayıtlı olmayan kartla ödeme yapma ve kartı kaydetme

const createPayment = () =>{
    return Payments.createPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        Installments: "1",
        basketId: "B67JDL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:{
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: "123",
            registerCard: "0",
        },
        buyer:{
            id:"SDSAGSD",
            name: "John",
            surname: "Doe",
            gsmNumber:"+905350000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-04 12:43:35",
            registrationAddress:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            ip:"85.34.78.112",
            city:"Istanbul",
            country: "Turkey",
            zipCode: "34732"

        },
        shippingAddress: {
            contactName:"John Doe",
            city:"Istanbul",
            country: "Turkey",
            address:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            zipCode: "34732"

        },
        billingAddress: {
            contactName:"John Doe",
            city:"Istanbul",
            country: "Turkey",
            address:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            zipCode: "34732"

        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung S20",
                category1:"Telefonlar",
                category1:"Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:150
            },
            {
                id:"BT101",
                name:"İphone 15",
                category1:"Telefonlar",
                category1:"İphone Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:90
            },
            {
                id:"BT101",
                name:"Samsung S24",
                category1:"Telefonlar",
                category1:"Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:60
            }
        ]

    }).then((result) => {
            console.log(result)
            Logs.logFile("6-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydetme",result)
        }).catch((err) =>{
            console.log(err);
            Logs.logFile("6-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydetme-hata",err)
        })
}

// createPayment();


//Bir kredi kartıyla odeme yap ve kartı kaydet
const createPaymentAndSaveCard = () =>{
    return Payments.createPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        Installments: "1",
        basketId: "B67JDL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:{
            cardUserKey: "dbedf9bc-0650-7190-7d21-94e718deb557",
            cardAlias: "Kredi Kartım Ödemeden Sonra",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: "123",
            registerCard: "1",
        },
        buyer:{
            id:"SDSAGSD",
            name: "John",
            surname: "Doe",
            gsmNumber:"+905350000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-04 12:43:35",
            registrationAddress:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            ip:"85.34.78.112",
            city:"Istanbul",
            country: "Turkey",
            zipCode: "34732"

        },
        shippingAddress: {
            contactName:"John Doe",
            city:"Istanbul",
            country: "Turkey",
            address:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            zipCode: "34732"

        },
        billingAddress: {
            contactName:"John Doe",
            city:"Istanbul",
            country: "Turkey",
            address:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            zipCode: "34732"

        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung S20",
                category1:"Telefonlar",
                category1:"Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:150
            },
            {
                id:"BT101",
                name:"İphone 15",
                category1:"Telefonlar",
                category1:"İphone Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:90
            },
            {
                id:"BT101",
                name:"Samsung S24",
                category1:"Telefonlar",
                category1:"Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:60
            }
        ]

    }).then((result) => {
            console.log(result)
            Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydet",result)
        }).catch((err) =>{
            console.log(err);
            Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydet-hata",err)
        })
}

// createPaymentAndSaveCard();
// readCardOfAUser()


//Bir kayıtlı kart ile ödeme yap

const createPaymentWithSavedCard = () =>{
    return Payments.createPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        Installments: "1",
        basketId: "B67JDL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:{
            cardUserKey: "c03b90a7-2ce2-f854-8427-a39b8923f16c",
            cardToken: "909391f1-5170-153a-6424-506497385736"

        },
        buyer:{
            id:"SDSAGSD",
            name: "John",
            surname: "Doe",
            gsmNumber:"+905350000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-04 12:43:35",
            registrationAddress:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            ip:"85.34.78.112",
            city:"Istanbul",
            country: "Turkey",
            zipCode: "34732"

        },
        shippingAddress: {
            contactName:"John Doe",
            city:"Istanbul",
            country: "Turkey",
            address:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            zipCode: "34732"

        },
        billingAddress: {
            contactName:"John Doe",
            city:"Istanbul",
            country: "Turkey",
            address:"Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
            zipCode: "34732"

        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung S20",
                category1:"Telefonlar",
                category1:"Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:150
            },
            {
                id:"BT101",
                name:"İphone 15",
                category1:"Telefonlar",
                category1:"İphone Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:90
            },
            {
                id:"BT101",
                name:"Samsung S24",
                category1:"Telefonlar",
                category1:"Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:60
            }
        ]

    }).then((result) => {
            console.log(result)
            Logs.logFile("8-payments-kayitli-bir-kartla-odeme-al",result)
        }).catch((err) =>{
            console.log(err);
            Logs.logFile("8-payments-kayitli-bir-kartla-odeme-al-hata",err)
        })
}

createPaymentWithSavedCard()
 
