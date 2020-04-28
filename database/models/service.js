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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
