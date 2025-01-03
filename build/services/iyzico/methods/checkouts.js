"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = exports.getFormPayment = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const initialize = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.checkoutFormInitialize.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.initialize = initialize;
const getFormPayment = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.checkoutForm.retrieve(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.getFormPayment = getFormPayment;