const bcrypt = require("bcrypt");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, anotherPassword) =>
  bcrypt.compareSync(password, anotherPassword);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
