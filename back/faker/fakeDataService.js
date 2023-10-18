const createMultipleFakeData = require("./helpers/createMultipleFakeData");
const generateFakePerson = require("./helpers/generateFakePerson");
const generateFakeLocation = require("./helpers/generateFakeLocation");
const Person = require("../users/models/mongodb/personSchema");
const Location = require("../productions/models/mongodb/locationSchema");
const ProductionType = require("../productions/models/mongodb/producionTypeSchema");
const Production = require("../productions/models/mongodb/productionSchema");
const textColor = require("../chalk/terminalColors");
const generateProdutionType = require("./helpers/generateProdutionType");
const createFakeData = require("./helpers/createFakeData");

const config = require("config");
const { createError } = require("../utils/handleErrors");
const DB = config.get("DB");

const generateFakeData = async () => {
  const sportsTypes = [
    "Football",
    "Basketball",
    "Soccer",
    "Tennis",
    "Baseball",
    "Golf",
    "Cricket",
    "Hockey",
    "Volleyball",
    "Rugby",
    "Swimming",
    "Track and Field",
    "Cycling",
    "Boxing",
    "Martial Arts",
    "Wrestling",
    "Skiing",
    "Snowboarding",
    "Surfing",
    "Gymnastics",
  ];

  try {
    await createMultipleFakeData(10, generateFakePerson, Person);
    await createMultipleFakeData(10, generateFakeLocation, Location);
    sportsTypes.map((item) => {
      createFakeData(
        generateProdutionType(item),
        ProductionType,
        "ProductionType created successfully",
        "failed creating ProductionType",
      );
    });
  } catch (error) {
    console.error("Error creating multiple fake data:", error);
  }
};

const createProductionType = (array) => {};

const deleteAllDataBase = async () => {
  try {
    // Delete all data from collections
    await Person.deleteMany({});
    await Location.deleteMany({});
    await ProductionType.deleteMany({});
    await Production.deleteMany({});

    console.log(textColor.warning("database deleted successfully."));
  } catch (error) {
    console.error(textColor.danger("Error deleting database:", error));
  }
};

const getFakeDataFromMongo = async (schema) => {
  if (DB === "MONGODB") {
    try {
      const data = await schema.find({}, { password: 0, __v: 0 });
      return Promise.resolve(data);
    } catch (error) {
      console.log(textColor.danger(`getFakedata catch from ${schema} `));
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

/* const getFakeUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await Person.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      console.log(textColor.danger("getFakeUsers catch"));
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};
const getFakeLoction = async () => {
  if (DB === "MONGODB") {
    try {
      const location = await Location.find({}, { password: 0, __v: 0 });
      return Promise.resolve(location);
    } catch (error) {
      console.log(textColor.danger("getFakeLocation catch"));
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("get users not in mongodb");
}; */

// generateProdutionType();

module.exports = { generateFakeData, deleteAllDataBase, getFakeDataFromMongo };
