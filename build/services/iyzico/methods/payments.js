"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPayment = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createPayment = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.payment.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.createPayment = createPayment;