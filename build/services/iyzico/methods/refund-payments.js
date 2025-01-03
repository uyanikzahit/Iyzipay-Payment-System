"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refundPayments = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const refundPayments = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.refund.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.refundPayments = refundPayments;