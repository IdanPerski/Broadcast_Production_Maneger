const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const {
  createProduction,
  getProductions,
  getProductionsForMainTable,
  getProductionById,
  getCrewMembersDetails,
  deleteProduction,
} = require("../productionsAccessDataService");
const terminalColors = require("../../chalk/terminalColors");
const normalizeProduction = require("../helpers/validations/normalizeProduction");
const auth = require("../../auth/authService");
const currentTime = require("../../utils/timeService");
const ProductionType = require("../models/mongodb/producionTypeSchema");
const Location = require("../models/mongodb/locationSchema");
const prodRouter = express.Router();

async function extarctPersonDeatails(crewMembers, crewMemberDetails = {}) {
  for (const key in crewMembers) {
    if (Array.isArray(crewMembers[key])) {
      crewMemberDetails[key] = await getCrewMembersDetails(crewMembers[key]);
    } else {
      crewMemberDetails[key] = await getCrewMembersDetails(crewMembers[key]);
    }
  }
}

prodRouter.get("/", async (req, res) => {
  console.log(terminalColors.safe("call from homePage"));

  try {
    const productions = await getProductionsForMainTable();

    return res.send(productions);
  } catch (error) {
    const statusCode = error.status || 500;

    console.log(statusCode);
    return handleError(res, statusCode, error.message);
  }
});
prodRouter.get("/:id", async (req, res) => {
  console.log(terminalColors.lemon("asking for production details"));

  try {
    const production = await getProductionById(req.params.id);
    const productionType = await ProductionType.findById(
      production.productionType,
    );
    const type = productionType.name;

    const location = await Location.findById(production.location);

    console.log(terminalColors.lemon("location", location));

    const controlRoomCrew = production.controlRoomCrew.toJSON();
    const controlRoomCrewDetails = {};

    const fieldCrew = production.fieldCrew.toJSON();
    const fieldCrewDetails = {};

    const talents = production.talents;
    console.log(talents);
    const talentsDetails = {};

    await extarctPersonDeatails(controlRoomCrew, controlRoomCrewDetails);
    await extarctPersonDeatails(fieldCrew, fieldCrewDetails);
    await extarctPersonDeatails(talents, talentsDetails);

    console.log(
      terminalColors.danger("controlRoomCrewDetails:"),
      controlRoomCrewDetails,
    );
    res.send({
      controlRoomCrewDetails,
      fieldCrewDetails,
      type,
      location,
      talentsDetails,
    });
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

prodRouter.post("/addProduction", async (req, res) => {
  console.log(terminalColors.lemon("req BODY:"), req.body);
  try {
    let production = req.body;
    const user = production.user_id;

    // -  user Authentication (middelware)
    //by user_id check if the user is admin
    if (user != "admin")
      handleError(res, 403, "Authentication Error: Unauthorize user");
    // TODO validateProduction
    // ...use joi vlaidtion

    // -normalize production
    production = await normalizeProduction(production, user);
    console.log(terminalColors.lemon("normalizeProduction:"), production);
    production = await createProduction(production);
  } catch (error) {
    console.log(`post error at addProduction ${error}`);
  }
});

prodRouter.delete("/:id" /* , auth */, async (req, res) => {
  try {
    const productionId = req.params.id;
    const user = req.user;
    // console.log(req);
    console.log(terminalColors.danger(productionId));
    console.log(terminalColors.danger(req.user));
    const productionToDelete = await deleteProduction(productionId, user);
    return res.send(productionToDelete);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = prodRouter;
