const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const { getFakeUsers, getFakeDataFromMongo } = require("../fakeDataService");
const Person = require("../../users/models/mongodb/personSchema");
const Location = require("../../productions/models/mongodb/locationSchema");
const ProductionType = require("../../productions/models/mongodb/producionTypeSchema");
const terminalColors = require("../../chalk/terminalColors");
const router = express.Router();

/* TODO- authenticatin middleware */
router.get("/addProduction", async (req, res) => {
  console.log("call from front");
  //   console.log(req);
  try {
    const user = req.user;
    /*     if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database",
      ); */

    const users = await getFakeDataFromMongo(Person);
    const location = await getFakeDataFromMongo(Location);
    const prodType = await getFakeDataFromMongo(ProductionType);
    const fakeData = { users, location, prodType };
    return res.send(fakeData);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
