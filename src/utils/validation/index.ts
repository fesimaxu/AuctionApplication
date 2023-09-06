import Joi from "joi";

export const registerSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  birth_year: Joi.number().integer().max(2005),
}).with("password", "repeat_password");

export const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const itemSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  startingBid: Joi.number().required(),
  reservePrice: Joi.number().required(),
  auctionEndTime: Joi.date().required(),
});
