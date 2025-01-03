"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePayment = exports.completePayment = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const initializePayment = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.threedsInitialize.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.initializePayment = initializePayment;
const completePayment = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.completePayment.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reject(result);
      }
    });
  });
};
exports.completePayment = completePayment;