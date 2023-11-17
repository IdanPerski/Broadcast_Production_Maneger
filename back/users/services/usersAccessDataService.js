const Person = require("../models/mongodb/personSchema");
const _ = require("lodash");
const { createError } = require("../../utils/handleErrors");
const { generateAuthToken } = require("../../auth/providers/jwt");
const { comparePassword } = require("../helpers/bycryptjs");
const config = require("config");
const terminalColors = require("../../chalk/terminalColors");
const DB = config.get("DB");

const getAllUSers = async (schema) => {
  if (DB === "MONGODB") {
    try {
      const data = await schema.find({}, { password: 0, __v: 0 });
      console.log(terminalColors.lemon("this is all users:"), data);
      return Promise.resolve(data);
    } catch (error) {
      console.log(terminalColors.danger(`getAllUSers catch from ${schema} `));
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const registerUser = async (normalizedUser) => {
  console.log(terminalColors.lemon("normalizedUser:"), normalizedUser);

  if (DB === "MONGODB") {
    try {
      const {
        contact: { email },
      } = normalizedUser;
      let user = await Person.findOne({ email });

      if (user) {
        console.log(terminalColors.lemon("USER:"), user);

        throw new Error("User already registered");
      }
      user = new Person(normalizedUser);
      user = await user.save();
      console.log(terminalColors.lemon(_.pick(user, ["roles"])));
      user = _.pick(user, ["name", "contact", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      console.log(terminalColors.danger(error), "ERROR! ");
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await Person.findOne({ email });
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");
      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid email or password");
      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUserById = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await Person.findById(userId);
      return Promise.resolve(user);
    } catch (error) {
      console.log(
        terminalColors.danger(
          "error at getUserById() at userAccsessDataService",
        ),
      );
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve(" user not in the data base");
};

const changeMemeberRate = async (userId, roleRateObj) => {
  if (DB === "MONGODB") {
    try {
      const user = await Person.findById(userId);
      const { roles } = user;
      const updatedRateforRoles = roles.map((obj) => {
        if (obj.role === roleRateObj.role) {
          // If the role matches, update the rate
          return { ...obj, rate: roleRateObj.rate };
        }

        return obj;
      });
      user.roles = updatedRateforRoles;

      await user.save();
      console.log(terminalColors.safe("rate updated successfuly"));
      return user;
    } catch (error) {
      console.log(terminalColors.warning("changeMemeberRate error"));
      console.log(error);
    }
  }
};
const addNewRoleAndRate = async (userId, roleRateObj) => {
  if (DB === "MONGODB") {
    try {
      const user = await Person.findById(userId);
      const { roles } = user;
      const updatedRateforRoles = [...roles, roleRateObj];
      user.roles = updatedRateforRoles;
      await user.save();
      return user;
    } catch (error) {
      console.log(terminalColors.warning("addNewRoleAndRate error"));
      console.log(error);
    }
  }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getAllUSers = getAllUSers;
exports.getUserById = getUserById;
exports.changeMemeberRate = changeMemeberRate;
exports.addNewRoleAndRate = addNewRoleAndRate;
