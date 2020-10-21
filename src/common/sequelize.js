const Sequelize = require('sequelize');
const config = require('./config');
const logger = require('./logger');

// connect to mysql
const sequelizeOptions = {
  dialect: 'mysql',
  port: config.mysql.port,
  host: config.mysql.host,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  ...(config.mysql.ssl && {
    ssl: config.mysql.ssl,
  }),
};

const sequelize = new Sequelize(
  config.mysql.db,
  config.mysql.user,
  config.mysql.password,
  sequelizeOptions,
);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Successfully established connection to database');
  })
  .catch((err) => {
    logger.error('Unable to connect to database', err);
  });

module.exports = sequelize;
