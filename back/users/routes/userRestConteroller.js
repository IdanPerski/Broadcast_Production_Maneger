const express = require("express");
const usersRouter = express.Router();
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const {
  registerUser,
  getUserById,
  changeMemeberRate,
  editMemberDetails,
  addNewRoleAndRate,
  loginUser,
} = require("../services/usersAccessDataService");
const auth = require("../../auth/authService");
const terminalColors = require("../../chalk/terminalColors");
const { generateUserPassword } = require("../helpers/bycryptjs");

/* TODO- authenticatin middleware */

usersRouter.post("/login", async (req, res) => {
  try {
    let user = req.body;
    console.log(user);
    const token = await loginUser(user);
    console.log(terminalColors.safe(token));
    return res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

usersRouter.get("/addProduction", async (req, res) => {
  console.log("call from front at userRouter.get");
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
usersRouter.get("/editUser/:userId", async (req, res) => {
  console.log(
    terminalColors.lemon(
      'call from front at usersRouter.get("/editUser/:userId" ',
    ),
  );

  try {
    const userId = req.params.userId;
    console.log(terminalColors.safe(userId));
    const user = await getUserById(userId);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

usersRouter.post("/register", async (req, res) => {
  try {
    let user = req.body;
    user = await normalizeUser(user);
    if (user.password != "") {
      user.password = generateUserPassword(user.password);
    }

    // user = registerValidation(user)

    user = await registerUser(user);
    console.log(terminalColors.safe("user created at mongo:"), user);
    return res.send(user);
  } catch (error) {
    console.log(error);
    return handleError(res, error.status || 500, error.message);
  }
});

usersRouter.patch("/editUser/:userId", async (req, res) => {
  console.log(terminalColors.lemon("editing rate"));
  const userId = req.params.userId;
  if (req.body.addRole) {
    console.log(terminalColors.warning("new role"));
    delete req.body.addRole;
    await addNewRoleAndRate(userId, req.body);
    return res.send("new role added");
  }
  console.log(terminalColors.lemon("new rate only"));

  const newUserRate = await changeMemeberRate(userId, req.body);

  res.send("rate updated successfully");
});

module.exports = usersRouter;
