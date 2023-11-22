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
  password: Joi.string().when("isAdmin", {
    is: true,
    then: Joi.string()
      .regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
      )
      .message(
        "The password must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-",
      )
      .required(),
    otherwise: Joi.string().allow("").optional(),
  }),
  roles: Joi.array().items(RoleSchema),
  isAdmin: Joi.boolean(),
};

export default AddUserSchema;
