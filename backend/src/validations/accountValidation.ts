import joi from "joi";

export const createValidation = joi.object({
  firstname: joi.string().required().description("firstname for the account"),
  lastname: joi.string().required().description("lastname for the account"),
  username: joi.string().required().description("username for the account"),
  password: joi.string().required().description("password for the account"),
});

export const loginValidation = joi.object({
  username: joi.string().required().description("username to login"),
  password: joi.string().required().description("password to login"),
});
