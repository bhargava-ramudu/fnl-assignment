const Joi = require("joi");

const schema = Joi.object({
  city: Joi.string().required().lowercase().trim(),
});

module.exports = schema;
