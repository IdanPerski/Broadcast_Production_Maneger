const cors = require("cors");

const whiteList = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:5501",
  "http://localhost:3000",
];

const corsOptions = {
  origin: whiteList,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
