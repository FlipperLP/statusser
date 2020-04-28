module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('emails', {
    serviceID: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    uniqueKeys: {
      uniqueEmail: {
        fields: ['serviceID', 'email'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('emails'),
};
