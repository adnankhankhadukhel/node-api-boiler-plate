const Joi = require('joi');

module.exports.some = Joi.object({
  something: Joi.string().required(),
});
