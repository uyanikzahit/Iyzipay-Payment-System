"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserCard = exports.deleteUserCard = exports.creatUserCard = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const creatUserCard = async data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.card.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.creatUserCard = creatUserCard;
const getUserCard = async data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.cardList.retrieve(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.getUserCard = getUserCard;
const deleteUserCard = async data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.card.delete(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.deleteUserCard = deleteUserCard;