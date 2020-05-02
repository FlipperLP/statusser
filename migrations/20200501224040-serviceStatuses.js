module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('serviceStatuses', {
    statusID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'ID',
      },
    },
    endpointID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'endpoints',
        key: 'ID',
      },
    },
    currentStatus: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('serviceStatuses'),
};
