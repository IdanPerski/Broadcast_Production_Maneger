const textColor = require("../chalk/terminalColors");

const config = require("config");

const ENVIRONMENT = config.get("ENVIRONMENT");
console.log(textColor.lemon(`sets to  ${ENVIRONMENT}  enviroment`));
const connectToDb = () => {
  if (ENVIRONMENT === "development")
    require("./mongodb/connectToMongodbLocally");
  if (ENVIRONMENT === "production") require("./mongodb/connectToAtlas");
};

module.exports = connectToDb;
