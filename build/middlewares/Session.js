"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//oturum açık kalma ya da belirli bir süre açık tutma islemlerini burdan kontrol ediyoruz.

const Session = _passport.default.authenticate("jwt", {
  session: false
});
var _default = exports.default = Session;