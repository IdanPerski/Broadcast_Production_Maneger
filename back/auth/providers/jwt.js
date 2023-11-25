const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.SECRET_KEY;

const generateAuthToken = (user) => {
  console.log("generateAuthToken");
  const {
    _id,
    isAdmin,
    name: { first },
  } = user;

  const payloadData = { _id, isAdmin, first, id: _id };
  const token = jwt.sign(payloadData, key);

  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, key);
    return userData;
  } catch (error) {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;

/* 
const jwt = require("jsonwebtoken");
const key = "SECRET";

const generateAuthToken = (user) => {
  const {
    _id,
    isBusiness,
    isAdmin,
    name: { first },
  } = user;
  const payloadData = { _id, isAdmin, isBusiness, first };
  const token = jwt.sign(payloadData, key);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, key);
    return userData;
  } catch (error) {
    return null;
  }
};

module.exports = generateAuthToken;
module.exports = verifyToken;

*/
