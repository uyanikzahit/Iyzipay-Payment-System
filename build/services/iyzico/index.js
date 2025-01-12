"use strict";

var _iyzipay = _interopRequireWildcard(require("iyzipay"));
var Cards = _interopRequireWildcard(require("./methods/cards"));
var Installments = _interopRequireWildcard(require("./methods/installments"));
var Payments = _interopRequireWildcard(require("./methods/payment"));
var PaymentsThreeDS = _interopRequireWildcard(require("./methods/threeds-payments"));
var Checkouts = _interopRequireWildcard(require("./methods/checkouts"));
var CancelPayment = _interopRequireWildcard(require("./methods/cancel-payments"));
var RefundPayments = _interopRequireWildcard(require("./methods/refund-payments"));
var _nanoid = _interopRequireDefault(require("../../utils/nanoid"));
var Logs = _interopRequireWildcard(require("../../utils/logs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// -----------------------------
/* a) CARDS */
// -----------------------------

const creatUserAndCard = () => {
  Cards.creatUserCard({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    email: "email@email.com",
    externaId: (0, _nanoid.default)(),
    card: {
      cardAlias: "Kredi Kartı",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030"
    }
  }).then(result => {
    console.log(result);
    Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur", result);
  }).catch(err => {
    console.log(err);
    Log.logFile("1-cards-kullanıcı-ve-kart-oluştur-hata", err);
  });
};

// creatUserAndCard();

//Bir kullanıcıya yeni bir kart ekle 
const creatACardForUser = () => {
  Cards.creatUserCard({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    email: "email@email.com",
    externaId: (0, _nanoid.default)(),
    cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c',
    card: {
      cardAlias: "Kredi Kartı",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030"
    }
  }).then(result => {
    console.log(result);
    Logs.logFile("2-cards-bir-kullanıcıya-kart-ekle", result);
  }).catch(err => {
    console.log(err);
    Log.logFile("2-cards-bir-kullanıcıya-kart-ekle-hata", err);
  });
};

// creatACardForUser()

//Bir kullanıcının kartlarını oku
const readCardOfAUser = () => {
  Cards.getUserCard({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c'
  }).then(result => {
    console.log(result);
    Logs.logFile("3-card-bir-kullanicinin-kartlarini-oku ", result);
  }).catch(err => {
    console.log(err);
    Log.logFile("3-card-bir-kullanicinin-kartlarini-oku-hata", err);
  });
};
// readCardOfAUser()

//Bir kullanıcının kartını sil
const deleteCardOfAUser = () => {
  Cards.deleteUserCard({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c',
    cardToken: '704d4d6f-adce-1b5c-1998-af963d51f90b'
  }).then(result => {
    console.log(result);
    Logs.logFile("4-card-bir-kullanicinin-kartini-sil ", result);
  }).catch(err => {
    console.log(err);
    Log.logFile("4-card-bir-kullanicinin-kartini-sil-hata", err);
  });
};
// deleteCardOfAUser();

// -----------------------------
/* b) INSTALLMENTS */
// -----------------------------

//Bir kart ve ücretle ilgili gerçekleşebilecek taksitlerin kontrolü
const checkInstallments = () => {
  return Installments.checkInstallment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    binNumber: "55287900",
    price: "100000"
  }).then(result => {
    console.log(result);
    Logs.logFile("5-installments-bir-kart-ve-ucret-kontrolu ", result);
  }).catch(err => {
    console.log(err);
    Log.logFile("5-installments-bir-kart-ve-ucret-kontrolu-hata", err);
  });
};

// checkInstallments()

// -----------------------------
/* c) NORMAL PAYMENT */
// -----------------------------

//Kayıtlı olmayan kartla ödeme yapma ve kartı kaydetme

const createPayment = () => {
  return Payments.createPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0"
    },
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("6-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydetme", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("6-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydetme-hata", err);
  });
};

// createPayment();

//Bir kredi kartıyla odeme yap ve kartı kaydet
const createPaymentAndSaveCard = () => {
  return Payments.createPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    Installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "dbedf9bc-0650-7190-7d21-94e718deb557",
      cardAlias: "Kredi Kartım Ödemeden Sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1"
    },
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydet", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydet-hata", err);
  });
};

// createPaymentAndSaveCard();
// readCardOfAUser()

//Bir kayıtlı kart ile ödeme yap

const createPaymentWithSavedCard = () => {
  return Payments.createPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    Installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "c03b90a7-2ce2-f854-8427-a39b8923f16c",
      cardToken: "909391f1-5170-153a-6424-506497385736"
    },
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("8-payments-kayitli-bir-kartla-odeme-al", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("8-payments-kayitli-bir-kartla-odeme-al-hata", err);
  });
};

// createPaymentWithSavedCard()

// -----------------------------
/* d) 3D Secure Payments */
// -----------------------------

// 3DS Odemesini Tamamla

const initializeThreeDSPayments = () => {
  PaymentsThreeDS.initializePayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    Installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0"
    },
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("9-threeds-payments-yeni-bir-kartla-odeme-al", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("9-threeds-payments-yeni-bir-kartla-odeme-al-hata", err);
  });
};

// initializeThreeDSPayments();

const completeThreeDSPayment = () => {
  PaymentsThreeDS.completePayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentId: "23324706",
    conversationData: "conversation data"
  }).then(result => {
    console.log(result);
    Logs.logFile("10-threeds-payments-odeme-tamamla", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("10-threeds-payments-odeme-tamamla-hata", err);
  });
};

// completeThreeDSPayment() 

// 3DS odemesini kayitli kartla gerceklestir
const initializeThreeDSPaymentsWithRegistereCard = () => {
  PaymentsThreeDS.initializePayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    Installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: 'c03b90a7-2ce2-f854-8427-a39b8923f16c',
      cardToken: '704d4d6f-adce-1b5c-1998-af963d51f90b'
    },
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("11-threeds-payments-kayitli-bir-kart", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("11-threeds-payments-kayitli-bir-kart-hata", err);
  });
};

// initializeThreeDSPaymentsWithRegistereCard()

const initializeThreeDSPaymentsWithNewCardAndRegister = () => {
  PaymentsThreeDS.initializePayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    Installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "dbedf9bc-0650-7190-7d21-94e718deb557",
      cardAlias: "Kredi Kartım Ödemeden Sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1"
    },
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("12-threeds-payments-kayitli-bir-kart", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("12-threeds-payments-kayitli-bir-kart-hata", err);
  });
};

// initializeThreeDSPaymentsWithNewCardAndRegister()
// readCardOfAUser();

// -----------------------------
/* a) CARDS */
// -----------------------------

// /Checkout form içerisinde odeme baslat

const initializeCheckoutForm = () => {
  Checkouts.initialize({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay.default.CURRENCY.TRY,
    Installments: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/checkout/complete/payment",
    cardUserKey: "dbedf9bc-0650-7190-7d21-94e718deb557",
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: "SDSAGSD",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732"
    },
    basketItems: [{
      id: "BT101",
      name: "Samsung S20",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 150
    }, {
      id: "BT101",
      name: "İphone 15",
      category1: "Telefonlar",
      category1: "İphone Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 90
    }, {
      id: "BT101",
      name: "Samsung S24",
      category1: "Telefonlar",
      category1: "Android Telefonlar",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: 60
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("13-threeds-payments-kayitli-bir-kart", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("13-threeds-payments-kayitli-bir-kart-hata", err);
  });
};

// initializeCheckoutForm()

//Tamamlanmis ya da tamamlanmamis checkout form ödeme bilgisini gosterir

const getFormPayment = () => {
  Checkouts.getFormPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    token: "ea15e2e0-e118-4450-99eb-e795e02d301b"
  }).then(result => {
    console.log(result);
    Logs.logFile("14-threeds-payments-get-detials", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("14-threeds-payments-get-detials-hata", err);
  });
};

// getFormPayment()

// -----------------------------
/* a) CARDS */
// -----------------------------

//Odemeyi iptal etme testi
const cancelPayments = () => {
  CancelPayment.cancelPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    conversationId: (0, _nanoid.default)(),
    paymentId: "23323074",
    ip: "85.34.78.112"
  }).then(result => {
    console.log(result);
    Logs.logFile("15-cancel-payments", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("15-cancel-payments-hata", err);
  });
};

// cancelPayments()

//Odemeyi iptal etme testi
const cancelPaymentsWithReason = () => {
  CancelPayment.cancelPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    conversationId: (0, _nanoid.default)(),
    paymentId: "23323055",
    ip: "85.34.78.112",
    reason: _iyzipay.default.REFUND_REASON.BUYER_REQUEST,
    description: "Kullanıcı isteği ile iptal edildi "
  }).then(result => {
    console.log(result);
    Logs.logFile("16-cancel-payments-reson", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("16-cancel-payments-reson-hata", err);
  });
};

// cancelPaymentsWithReason()

// -----------------------------
/* g) Refund Payments */
// -----------------------------

//Odemenin belirli bir parcasini iade et

const refundPayments = () => {
  RefundPayments.refundPayments({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentTransactionId: "25301209",
    price: "50",
    currency: _iyzipay.default.CURRENCY.TRY,
    ip: "85.34.78.112"
  }).then(result => {
    console.log(result);
    Logs.logFile("17-refund-payments", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("17-refund-payments-hata", err);
  });
};
// refundPayments()

//Odemenin bir kismini neden ve aciklama ile iade et 

const refundPaymentsWithReason = () => {
  RefundPayments.refundPayments({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentTransactionId: "25301178",
    price: "100",
    currency: _iyzipay.default.CURRENCY.TRY,
    ip: "85.34.78.112",
    reason: _iyzipay.default.REFUND_REASON.BUYER_REQUEST,
    description: "Kullanıcı iade istedi."
  }).then(result => {
    console.log(result);
    Logs.logFile("18-refund-payments-with-reason", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("18-refund-payments-with-reason-hata", err);
  });
};
// refundPaymentsWithReason()