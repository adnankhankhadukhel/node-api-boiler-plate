/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    referId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    currency: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isKycApproved: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
    },
    signUpVia: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    is2faEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
    },
    isGAuthEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
    },
    isSMSEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
    },
    isWithdrawalAddressEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    gAuthSecret: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1',
    },
    isPhoneVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    isEmailVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'users',
  });
};
