"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelPayment = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const cancelPayment = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.cancel.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.cancelPayment = cancelPayment;