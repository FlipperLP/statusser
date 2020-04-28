module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('services', {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('services'),
};
