const Sequelize = require('sequelize');
const sequelize = require('../common/sequelize');

const some = require('./some')(sequelize, Sequelize);

// Doing manually to get ide intellisense
const db = {
  sequelize,
  some,
};

db.sequelize = sequelize;

module.exports = db;
