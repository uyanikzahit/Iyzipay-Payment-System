"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiError = _interopRequireDefault(require("../error/ApiError"));
var Cards = _interopRequireWildcard(require("../services/iyzico/methods/cards"));
var _users = _interopRequireDefault(require("../db/users"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
var _Session = _interopRequireDefault(require("../middlewares/Session"));
var _lodash = require("lodash");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = router => {
  //Kart ekleme
  router.post("/cards", _Session.default, async (req, res) => {
    const {
      card
    } = req.body;
    console.log({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      email: req.user.email,
      externalId: (0, _nanoid.default)(),
      ...(req.user?.cardUserKey && {
        cardUserKey: req.user.cardUserKey
      }),
      card: card
    });
    let result = await Cards.creatUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      email: req.user.email,
      externalId: (0, _nanoid.default)(),
      ...(req.user?.cardUserKey && {
        cardUserKey: req.user.cardUserKey
      }),
      card: card
    });
    if (!req.user.cardUserKey) {
      if (result?.status === "success" && result?.cardUserKey) {
        const user = await _users.default.findOne({
          _id: req.user?._id
        });
        user.cardUserKey = result?.cardUserKey;
        await user.save();
      }
    }
    res.json(result);
  });

  //Kart okuma
  router.get("/cards", _Session.default, async (req, res) => {
    if (!req.user?.cardUserKey) {
      throw new _ApiError.default("User has no credit card", 403, "userHasNoCard");
    }
    let cards = await Cards.getUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey
    });
    res.status(200).json(cards);
  });

  //Kart silme - token
  router.delete("/cards/delete-by-token", _Session.default, async (req, res) => {
    const {
      cardToken
    } = req.body;
    if (!cardToken) {
      throw new _ApiError.default("Card token is required", 400, "cardTokenRequired");
    }
    let deleteResult = await Cards.deleteUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey,
      cardToken: cardToken
    });
    res.status(200).json(deleteResult);
  });

  //Kart silme - index
  router.delete("/cards/:cardIndex/delete-by-index", _Session.default, async (req, res) => {
    if (!req.params?.cardIndex) {
      throw new _ApiError.default("Card Index is required", 400, "cardIndexRequired");
    }
    let cards = await Cards.getUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey
    });
    const index = (0, _lodash.parseInt)(req.params?.cardIndex);
    if (index >= cards?.cardDetails.length) {
      throw new _ApiError.default("Card doesnt exists, check index number", 400, "cardIndexInvalid");
    }
    const {
      cardToken
    } = cards?.cardDetails[index];
    let deleteResult = await Cards.deleteUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey,
      cardToken: cardToken
    });
    res.json(deleteResult);
  });
};
exports.default = _default;