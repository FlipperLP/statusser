const Sequelize = require('sequelize');

module.exports = sequelize.define('service', {
  serviceID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  serviceName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  endpointCode: {
    type: Sequelize.STRING(2),
    allowNull: false,
    unique: true,
  },
  currentStatus: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
  },
});
