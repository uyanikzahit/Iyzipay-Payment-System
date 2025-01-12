"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iyzipay = _interopRequireDefault(require("iyzipay"));
var _moment = _interopRequireDefault(require("moment"));
var _carts = _interopRequireDefault(require("../db/carts"));
var _users = _interopRequireDefault(require("../db/users"));
var _ApiError = _interopRequireDefault(require("../error/ApiError"));
var _Session = _interopRequireDefault(require("../middlewares/Session"));
var PaymentsThreeDS = _interopRequireWildcard(require("../services/iyzico/methods/threeds-payments"));
var Cards = _interopRequireWildcard(require("../services/iyzico/methods/cards"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
var _payments = require("../utils/payments");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = router => {
  router.post("/threeds/payments/complete", async (req, res) => {
    if (!req.body?.paymentId) {
      throw new _ApiError.default("Payment id is required", 400, "paymentIdRequired");
    }
    if (req.body.status !== "success") {
      throw new _ApiError.default("Payment cant be starred because initialization is failed", 400, "initializationFailed");
    }
    const data = {
      locale: "tr",
      conversationId: (0, _nanoid.default)(),
      paymentId: req.body.paymentId,
      conversationData: req.body.conversationData
    };
    const result = await PaymentsThreeDS.completePayment(data);
    await (0, _payments.CompletePayment)(result);
    res.status(200).json(result);
  });

  //YENİ BİR KARTLA ÖDEME OLUŞTUR VE KARTI KAYDETME
  router.post("/threeds/payments/:cartId/with-new-card", _Session.default, async (req, res) => {
    const {
      card
    } = req.body;
    if (!card) {
      throw new _ApiError.default("Card is required", 400, "cardRequired");
    }
    if (!req.params?.cartId) {
      console.error("Cart ID is missing:", req.params);
      throw new _ApiError.default("Cart id is required", 400, "cartIdRequired");
    }
    const cart = await _carts.default.findOne({
      _id: req.params?.cartId
    }).populate("buyer").populate("products");
    if (!cart) {
      console.error("Cart not found for ID:", req.params.cartId);
      throw new _ApiError.default("Cart not found", 404, "cartNotFound");
    }
    if (cart?.completed) {
      throw new _ApiError.default("Cart is completed", 400, "cartCompleted");
    }
    card.registerCard = "0";
    const paidPrice = cart.products.map(product => product.price).reduce((a, b) => a + b, 0);
    const data = {
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      price: paidPrice,
      paidPrice: paidPrice,
      currency: _iyzipay.default.CURRENCY.TRY,
      installments: '1',
      basketId: String(cart?._id),
      paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB,
      paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `{process.env.END_POINT}/threeds/payments/complete`,
      paymentCard: card,
      buyer: {
        id: String(req.user._id),
        name: req.user?.name,
        surname: req.user?.surname,
        gsmNumber: req.user?.phoneNumber,
        email: req.user?.email,
        identityNumber: req.user?.identityNumber,
        lastLoginDate: (0, _moment.default)(req.user?.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
        registrationDate: (0, _moment.default)(req.user?.createddAt).format("YYYY-MM-DD HH:mm:ss"),
        registrationAddress: req.user?.address,
        ip: req.user?.ip,
        city: req.user?.city,
        country: req.user?.country,
        zipCode: req.user?.zipCode
      },
      shippingAddress: {
        contactName: req.user?.name + " " + req.user?.surname,
        city: req.user?.city,
        country: req.user?.country,
        address: req.user?.address,
        zipCode: req.user?.zipCode
      },
      billingAddress: {
        contactName: req.user?.name + " " + req.user?.surname,
        city: req.user?.city,
        country: req.user?.country,
        address: req.user?.address,
        zipCode: req.user?.zipCode
      },
      basketItems: cart.products.map(product => {
        return {
          id: String(product?._id),
          name: product?.name,
          category1: product.categories[0],
          category2: product.categories[1],
          itemType: _iyzipay.default.BASKET_ITEM_TYPE[product?.itemType],
          price: product?.price
        };
      })
    };

    // console.log(data);
    // res.json({test:1})

    let result = await PaymentsThreeDS.initializePayment(data);
    const html = Buffer.from(result?.threeDSHtmlContent, 'base64').toString();
    res.send(html);
  });
};
exports.default = _default;