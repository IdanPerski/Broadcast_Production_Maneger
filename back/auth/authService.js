const jwt = require("jws");
const { verifyToken } = require("./providers/jwt");
const config = require("config");
const { handleError } = require("../utils/handleErrors");
const terminalColors = require("../chalk/terminalColors");
const tokenGenerator = config.get("TOKEN_GENERATOR");

const auth = (req, res, next) => {
  console.log(terminalColors.lemon(tokenGenerator));
  if (tokenGenerator == "jwt") {
    try {
      console.log(req.header, "header");
      const tokenFromClient = req.header("x-auth-token");
      console.log(terminalColors.lemon(tokenFromClient));
      if (!tokenFromClient)
        throw new Error("authentication Error:please login");
      const verifyUser = verifyToken(tokenFromClient);
      if (!verifyUser) throw new Error("Unauthorize user");
      req.user = verifyUser;

      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }
  return handleError(res, 500, "invalid token generator");
};

module.exports = auth;
