const Joi = require('joi');
// const { resetUserPassword } = require('../validations');

const validationMiddleware = (validationObject, isGet = false) => (req, res, next) => {
  const body = isGet ? req.query : req.body;
  const { error } = Joi.validate(body, validationObject);
  if (error) {
    return res
      .status(401)
      .send({ code: 401, message: error.message });
  }
  return next();
};

module.exports = validationMiddleware;
