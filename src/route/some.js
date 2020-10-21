const express = require('express');
const { UserController } = require('../controller');

const someRouter = express.Router();
const { validationMiddleware } = require('../middleware');
const { someValdations } = require('../validations');

someRouter.post('/some', validationMiddleware(someValdations.some), UserController.register);

module.exports = someRouter;
