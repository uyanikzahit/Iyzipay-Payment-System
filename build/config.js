"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const production = process.argv.slice(2).includes("dev") ? false : true;
const config = {
  development: !production,
  production: production,
  deployment: production ? "PRODUCTİON" : "DEVELOPMENT"
};
var _default = exports.default = config;