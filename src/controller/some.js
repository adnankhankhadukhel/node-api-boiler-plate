/* eslint-disable consistent-return */
const { SomeService } = require('../service');
const { SUCCESS_CODES } = require('../constant');

const { responseHandler } = require('../utils/response');

class SomeController {
  static async getSomething(req, res, next) {
    try {
      const result = await SomeService.getSomething();
      return responseHandler({
        response: res,
        ...SUCCESS_CODES.SOME,
        result,
        isSuccess: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SomeController;
