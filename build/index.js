"use strict";

require("express-async-errors");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _config = _interopRequireDefault(require("./config.js"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _https = _interopRequireDefault(require("https"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _db = _interopRequireDefault(require("./db"));
var _users = _interopRequireDefault(require("./db/users"));
var _GenericErrorHandler = _interopRequireDefault(require("./middlewares/GenericErrorHandler.js"));
var _ApiError = _interopRequireDefault(require("./error/ApiError.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const envPath = _config.default?.production ? "./env/.prod" : "./env/.dev";
_dotenv.default.config({
  path: envPath
});

//Begin MongoDB Connection

_mongoose.default.connect(process.env.MONGO_URI, {
  // useNewUrlParser:true,
  // useUnifiedTopology:true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.log(err);
});

//End MongoDB Connection

const app = (0, _express.default)();
app.use((0, _morgan.default)(process.env.LOGGER));

//Tarayıcıdan farklı yerlerden istek atilinca bizim sunucumuzdan gerçekleştiriyor.
//Sadece tarayıcıları ilgilendiren bir durum. 
app.use((0, _helmet.default)());
app.use((0, _cors.default)({
  origin: "*"
}));
app.use(_express.default.json({
  limit: "1mb"
}));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use("/", (req, res) => {
  throw new _ApiError.default("Bir hata oluştu", 404, "somethingWrong");
  res.json({
    test: 1
  });
});
app.use(_GenericErrorHandler.default);
if (process.env.HTTPS_ENABLED == "true") {
  const key = _fs.default.readFileSync(_path.default.join(__dirname, "./certs/key.pem")).toString();
  const cert = _fs.default.readFileSync(_path.default.join(__dirname, "./certs/cert.pem")).toString();
  const server = _https.default.createServer({
    key: key,
    cert: cert
  }, app);
  server.listen(process.env.PORT, () => {
    console.log("Express uygulamamız " + process.env.PORT + " üzerinden çalışmaktadır");
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log("Express uygulamamız " + process.env.PORT + " üzerinden çalışmaktadır");
  });
}