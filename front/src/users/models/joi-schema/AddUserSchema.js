import Joi, { string } from "joi";
import RoleSchema from "./roleShcema";

// await RoleSchema.validateAsync();

const AddUserSchema = {
  first: Joi.string().min(2).max(256).required(),
  last: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'user "phone" must be a valid phone number' })
    .required(),
  email: Joi.string()
    .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'user "mail" must be a valid mail' })
    .required(),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  streetNumber: Joi.number().required(),
  // role: Joi.string(),
  password: Joi.string().min(0).allow(), //TODO-set password ruleset
  roles: Joi.array().items(RoleSchema),
  authorization: Joi.string().required(),
};

export default AddUserSchema;
