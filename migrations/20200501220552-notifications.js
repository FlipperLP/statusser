module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
    userID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notificationServiceID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'notificationServices',
        key: 'ID',
      },
    },
    serviceIdentifier: {
      type: Sequelize.STRING(60),
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
      uniqueNotification: {
        fields: ['notificationServiceID', 'serviceIdentifier'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('notifications'),
};
