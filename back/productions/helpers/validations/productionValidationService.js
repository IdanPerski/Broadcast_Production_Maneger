const productionJoiValidation = require("./joi/joiValidationProduction");

const config = require("config");

const validator = config.get("VALIDATOR");

const validateProduction = (production) => {
  if (validator == "joi") {
    const { error } = productionJoiValidation(production);
    if (error) return error.details[0].message;
    return false;
  }
};

module.exports = validateProduction;
