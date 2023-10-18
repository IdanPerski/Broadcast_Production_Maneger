const morganLogger = require("../morganLogger");
const config = require("config");
const LOGGER = config.get("LOGGER");

let usedLogger;
if (LOGGER === "morgan") {
  usedLogger = morganLogger;
}

module.exports = usedLogger;
