const { someDal } = require('../dal');

class SomeService {
  static async getSomething() {
    const someAll = await someDal.findAll(
      {
        attributes: ['id', 'something', 'some'],
      },
    );
    return someAll;
  }
}
module.exports = SomeService;
