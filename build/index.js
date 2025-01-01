"use strict";

var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_fs.default.writeFileSync("test.txt", "asdgsdgs", {
  encoding: "utf-8"
});