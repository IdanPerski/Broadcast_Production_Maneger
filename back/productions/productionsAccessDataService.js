const config = require("config");
const connectToDb = require("../DB/dbService");
const textColors = require("../chalk/terminalColors");
const { createError, handleError } = require("../utils/handleErrors");
const Production = require("./models/mongodb/productionSchema");
const terminalColors = require("../chalk/terminalColors");
const ProductionType = require("./models/mongodb/producionTypeSchema");
const currentTime = require("../utils/timeService");
const getWeatherIcon = require("../weatherApi/accessesWeatherApi");
const Person = require("../users/models/mongodb/personSchema");
const DB = config.get("DB");
const getProductions = async () => {
  if (DB === "MONGODB") {
    try {
      const productions = await Production.find();

      console.log(productions, "productions");
      return Promise.resolve(productions);
    } catch (error) {
      error.status = 404;
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("getProductions not in mongodb");
};
const getProductionById = async (id) => {
  console.log(terminalColors.danger(id));
  if (DB === "MONGODB") {
    try {
      const production = await Production.findById(id);

      if (!production) {
        throw new Error("Production not found");
      }

      console.log(production, "production");
      return Promise.resolve(production);
    } catch (error) {
      error.status = 404;
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("production not in mongodb");
};
const getProductionsForMainTable = async () => {
  if (DB === "MONGODB") {
    try {
      const productions = await Production.find().populate("location");

      const currentDate = new Date();

      // Filter productions to keep only future productions
      const futureProductions = productions.filter((production) => {
        // Parse the production date from string to Date object
        const productionDate = new Date(production.date);
        // Compare the production date with the current date
        return productionDate >= currentDate;
      });

      const productionDetails = await Promise.all(
        futureProductions.map(async (_production) => {
          const _id = _production._id;
          const locationName = `${_production.location.name}, ${_production.location.address.city}`;
          const { day, month, year } = currentTime(_production.date);

          const date = `${day}/${month}/${year}`;
          // console.log(terminalColors.lemon(_production.location.address.city));

          const weatherData = await getWeatherIcon(
            _production.location.address.city,
          );
          if (weatherData === "ENOTFOUND") {
            console.log(terminalColors.lemon("city not found"));
          }

          return {
            _id,
            locationName,
            date,
            weatherData,
          };
        }),
      );

      console.log("Extracted Values:", productionDetails);
      return Promise.resolve(productionDetails);
    } catch (error) {
      console.log(
        terminalColors.danger("error from getProductionsForMainTable"),
      );
      error.status = 404;
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("getProductions not in mongodb");
};

const createProduction = async (normalizedProduction) => {
  if (DB === "MONGODB") {
    try {
      let production = new Production(normalizedProduction);
      await production.save();
      console.log(textColors.safe("production created at mongo:"), production);
      return Promise.resolve(production);
    } catch (error) {
      console.log(error);
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("createProduction not in mongodb");
};

async function getCrewMembersDetails(crewMemberIds) {
  try {
    if (!Array.isArray(crewMemberIds)) {
      const crewMember = await Person.findById(crewMemberIds);
      if (crewMember) {
        const { name } = crewMember;
        return Promise.resolve({
          name: `${name.firstName} ${name.lastName}`,
          _id: crewMember._id,
        });
      }
    } else {
      const crewMembers = await Promise.all(
        crewMemberIds.map(async (crewMemberId) => {
          const crewMember = await Person.findById(crewMemberId);
          if (crewMember) {
            const { name } = crewMember;
            return {
              name: `${name.firstName} ${name.lastName}`,
              _id: crewMember._id,
            };
          }
          return null; // Handle the case when a crew member is not found
        }),
      );

      // Filter out any null values (crew members not found)
      const filteredCrewMembers = crewMembers.filter(
        (member) => member !== null,
      );

      return filteredCrewMembers;
    }
  } catch (error) {
    throw error;
  }
}

const deleteProduction = async (productionId, userId) => {
  if (DB === "MONGODB") {
    try {
      const production = await Production.findById(productionId);
      if (!production)
        throw new Error("couldn't find this production in the database");
      // if (!userId.isAdmin) throw new Error("this user in not an admin");
      /*  if (userId.isAdmin || card.user_id.toString() == userId) {
        await Card.findByIdAndDelete(productionId);
        return Promise.resolve("Card deleted successfully");
      } else {
        throw new Error("You don't have permission to delete this card");
      } */

      await Production.findByIdAndDelete(productionId);
      return Promise.resolve("production deleted successfully");
    } catch (error) {
      error.status = 404;
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("deleteProduction not in mongodb");
};

exports.createProduction = createProduction;
exports.getProductions = getProductions;
exports.getProductionsForMainTable = getProductionsForMainTable;
exports.getProductionById = getProductionById;
exports.getCrewMembersDetails = getCrewMembersDetails;
exports.deleteProduction = deleteProduction;
