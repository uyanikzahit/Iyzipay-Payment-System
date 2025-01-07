"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiError = _interopRequireDefault(require("../error/ApiError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//Hata geldiğinde bu kod calismasini sağliyoruz.

const GenericErrorHandler = (err, req, res, next) => {
  if (!(err instanceof _ApiError.default)) {
    console.error(err);
  }
  if (/\w+ valitadion failed: \w+/i.test(err.message)) {
    err.message = err.message.replace(/\w+ valitadion failed: \w+/i, "");
  }
  res.status(err.status || 500).json({
    status: err?.status,
    error: err?.message,
    code: err?.code
  });
};
var _default = exports.default = GenericErrorHandler;