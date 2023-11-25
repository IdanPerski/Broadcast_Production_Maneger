const textColor = require("../chalk/terminalColors");

const config = require("config");
const connectToAtlas = require("./mongodb/connectToAtlas");

const { development } = config.ENVIRONMENT;
const ENVIRONMENT = config.get("ENVIRONMENT");
console.log(textColor.lemon(`development enviroment is  ${development}  `));
const connectToDb = () => {
  if (development === true) {
    require("./mongodb/connectToMongodbLocally");
  } else {
    require("./mongodb/connectToAtlas");
    connectToAtlas();
  }
};

module.exports = connectToDb;
