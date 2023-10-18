const textColor = require("../chalk/terminalColors");

const handleError = (res, status, message = "") => {
  console.log(textColor.danger(`handelig error ${status}`));
  console.log(textColor.danger(`message:${message}`));

  // console.log(textColor.lemon(res.status(status)));
  return res.status(status).send(message);
};

const createError = (validator, error) => {
  errorMessage = `${validator} Error: ${error.message}`;
  error.message = errorMessage;
  error.status = error.status || 400;
  console.log(error);
  throw Promise.reject();
};

module.exports = { handleError, createError };
