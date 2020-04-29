const Sequelize = require('sequelize');

module.exports = sequelize.define('email', {
  serviceID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'services',
      key: 'serviceID',
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  notified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
},
{
  uniqueKeys: {
    uniqueEmail: {
      fields: ['serviceID', 'email'],
    },
  },
});
