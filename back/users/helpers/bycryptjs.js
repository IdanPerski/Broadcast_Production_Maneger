const bcrypt = require("bcrypt");
const { lemon } = require("../../chalk/terminalColors");

console.log(bcrypt);
const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, anotherPassword) => {
  console.log(lemon("comparing passwords"));
  return bcrypt.compareSync(password, anotherPassword);
};
exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
