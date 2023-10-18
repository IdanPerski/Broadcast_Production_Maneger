const express = require("express");
const usersRouter = express.Router();
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const { registerUser } = require("../services/usersAccessDataService");
const auth = require("../../auth/authService");
const terminalColors = require("../../chalk/terminalColors");
const { generateUserPassword } = require("../helpers/bycryptjs");

/* TODO- authenticatin middleware */
usersRouter.get("/addProduction", async (req, res) => {
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

    const users = await getAllUse(Person);
    // const location = await getFakeDataFromMongo(Location);
    // const prodType = await getFakeDataFromMongo(ProductionType);
    const data = { users };
    return res.send(fakeData);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

usersRouter.post("/register", async (req, res) => {
  try {
    let user = req.body;
    user = await normalizeUser(user);

    // user.password = generateUserPassword(user.password);
    // user = registerValidation(user)

    user = await registerUser(user);
    console.log(user);
    console.log(terminalColors.safe("user created at mongo:"), user);
    return res.send(user);
  } catch (error) {
    console.log(terminalColors.danger(error));
    console.log(error);
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = usersRouter;
