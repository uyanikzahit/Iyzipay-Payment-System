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
var Checkouts = _interopRequireWildcard(require("../services/iyzico/methods/checkouts"));
var Cards = _interopRequireWildcard(require("../services/iyzico/methods/cards"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
var _payments = require("../utils/payments");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = router => {
  //CHECKOUTS FORM COMPLETE PAYMENT
  router.post("/checkouts/complete/payment", async (req, res) => {
    let result = await Checkouts.getFormPayment({
      locale: "tr",
      conversationId: (0, _nanoid.default)(),
      token: req.body.token
    });
    await (0, _payments.CompletePayment)(result);
    res.json(result);
  });
};
exports.default = _default;