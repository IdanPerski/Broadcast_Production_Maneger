const mongoose = require("mongoose");
const textColor = require("../../chalk/terminalColors");
const _dataBase = "sbpm";

mongoose
  .connect(`mongodb://127.0.0.1:27017/${_dataBase}`)
  .then(() => console.log(textColor.safe("connected to MongoDb Locally!")))
  .catch((error) =>
    console.log(textColor.danger(`could not connect to mongoDb: ${error}`)),
  );

// module.exports
