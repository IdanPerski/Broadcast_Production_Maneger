import Joi from "joi";

const RoleSchema = {
  role: Joi.string().min(2).max(256).required(),
  // rate: Joi.string().required(),
};

export default RoleSchema;
