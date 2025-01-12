"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class ApiError extends Error {
  constructor(message, status = 500, code) {
    super(message);

    // `status` değerinin sayı olduğundan emin olun
    if (!Number.isInteger(status)) {
      throw new TypeError("Status must be a number.");
    }
    this.status = status;
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
var _default = exports.default = ApiError;