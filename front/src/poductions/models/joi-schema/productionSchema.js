import Joi from "joi";

const productionSchema = {
  date: Joi.date().greater("now").required(),
  type: Joi.string().required(),
  location: Joi.string().required(),
  producer: Joi.array().items(Joi.object()).required(),
  technician: Joi.array().items(Joi.object()),
  cameraOperators: Joi.array().items(Joi.object()),
  director: Joi.string().required(),
  visionMixerOperator: Joi.string().allow(""),
  editor: Joi.string().allow(""),
  audioEngineer: Joi.string().allow(""),
  vtr: Joi.array().items(Joi.object()).allow(""),
  cg: Joi.string().allow(""),

  talents: Joi.array().items(Joi.object()).allow(""),
};

export default productionSchema;
