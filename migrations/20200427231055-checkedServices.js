module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('checkedservices', {
    serviceID: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    hubName: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
    },
    ownerID: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('checkedservices'),
};
