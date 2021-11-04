const Joi = require("@hapi/joi");

const authRegisterSchema = Joi.object({
  name: Joi.string().min(5).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  role: Joi.string().required(),
  password: Joi.string().min(2).required(),
  repeat_password: Joi.string().valid(Joi.ref("password")),
});

const authEditSchema = Joi.object({
  name: Joi.string().min(5).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
});
const LoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});
const ChangePasswordSchema = Joi.object({
  password: Joi.string().min(2).required(),
  repeat_password: Joi.string().required().valid(Joi.ref("password")),
});

module.exports = {
  authRegisterSchema,
  LoginSchema,
  authEditSchema,
  ChangePasswordSchema,
};
