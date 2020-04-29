module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('services', {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    uniqueKeys: {
      uniqueService: {
        fields: ['serviceName', 'endpointCode'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('services'),
};
