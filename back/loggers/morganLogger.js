const morgan = require("morgan");
const currentTime = require("../utils/timeService");
const textColor = require("../chalk/terminalColors"); //terminal log colors;
const morganLogger = morgan((tokens, req, res) => {
  const { year, month, day, hours, minutes, seconds } = currentTime();
  const now = `[${day}/${month}/${year}  ${hours}:${minutes}:${seconds}]`;
  const myLog = [
    now,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",

    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  if (res.statusCode >= 400) console.log(textColor.danger(myLog));
  else console.log(textColor.safe(myLog));
});

module.exports = morganLogger;
