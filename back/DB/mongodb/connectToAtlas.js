const mongoose = require("mongoose");
const textColor = require("../../chalk/terminalColors");

require("dotenv").config();
const userName = process.env.ATLAS_USER_NAME;
const password = process.env.ATLAS_PASSWORD;

const uri = `mongodb+srv://${userName}:${password}@cluster0.ar8xbad.mongodb.net/`;

const connectToAtlas = async () => {
  try {
    await await mongoose.connect(uri);
    console.log(textColor.safe("connected to Atlas mongoDB"));
  } catch (error) {
    console.log(error, textColor.danger("Error connecting to MongoDB Atlas"));
  }
};

module.exports = connectToAtlas;
