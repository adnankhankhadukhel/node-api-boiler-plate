const { Cruds } = require('./BaseClasses');
const { some } = require('../models');

class SomeDal extends Cruds {
  constructor(Model) {
    super(Model);
    this.Model = Model;
    this.associations();
  }

  // eslint-disable-next-line no-empty-function
  // associations() {
  //   this.Model.hasOne(userInformation, {
  //     as: 'userInformation',
  //     foreignKey: 'userId',
  //     sourceKey: 'id',
  //   });
  // }
}
module.exports = new SomeDal(some);
