module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('services', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    endpointID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'endpoints',
        key: 'ID',
      },
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
  },
  {
    uniqueKeys: {
      uniqueService: {
        fields: ['name', 'endpointID'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('services'),
};
