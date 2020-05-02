module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('endpoints', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    uri: {
      type: Sequelize.STRING(255),
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
  },
  {
    uniqueKeys: {
      uniqueService: {
        fields: ['name', 'uri'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('endpoints'),
};
