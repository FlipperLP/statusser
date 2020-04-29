const Sequelize = require('sequelize');

module.exports = sequelize.define('service', {
  serviceID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serviceName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endpointCode: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
  currentStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
},
{
  uniqueKeys: {
    uniqueService: {
      fields: ['serviceName', 'endpointCode'],
    },
  },
});
