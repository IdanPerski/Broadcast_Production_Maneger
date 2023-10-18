const Joi = require("joi");
const validateProductionWithJoi = (production) => {
  const productionValidationSchema = Joi.object({
    audioEngineer: Joi.object().allow(""),
    cameraOperators: Joi.array().items(Joi.object()),
    cg: Joi.object().allow(""),
    date: Joi.date(),
    director: Joi.object().allow(""),
    editor: Joi.object().allow(""),
    location: Joi.object(),
    producer: Joi.array().items(Joi.object().allow("")),
    talents: Joi.array().items(Joi.object().allow("")),
    technician: Joi.array().items(Joi.object().allow("")),
    type: Joi.object(),
    visionMixerOperator: Joi.object().allow(""),
    vtr: Joi.array().items(Joi.object().allow("")),
  });

  return productionValidationSchema.validate(production);
};

module.exports = validateProductionWithJoi;
