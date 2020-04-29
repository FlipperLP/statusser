const Sequelize = require('sequelize');

const testToken = '../config/config.json';

const config = require('../config/main.json');

async function checkForMigrations(db) {
  await console.log('[DB] Checking DB stucture...');
  const fs = require('fs');
  const migrations = fs.readdirSync('./migrations');
  const [checkDBMigration] = await db.query('SHOW TABLES LIKE \'SequelizeMeta\'', { type: Sequelize.QueryTypes.SELECT });
  if (!checkDBMigration) {
    await console.log('[DB] Missing tables! Creating...');
    await db.queryInterface.createTable('SequelizeMeta', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    });
    await migrations.forEach(async (name) => {
      const migration = require(`../migrations/${name}`);
      migration.up(db.queryInterface, Sequelize);
      await db.query('INSERT INTO `SequelizeMeta` VALUES(:name)', { type: Sequelize.QueryTypes.INSERT, replacements: { name } });
    });
    await console.log('[DB] Created!');
  }
  await console.log('[DB] Done!');
}

console.log('[DB] Connecting...');
let database;
let user;
let password;
let host;
if (config.inDev) {
  const DBCredentials = require(testToken).development;
  database = DBCredentials.database;
  user = DBCredentials.username;
  password = DBCredentials.password;
  host = DBCredentials.host;
} else {
  database = process.env.DBName;
  user = process.env.DBName;
  password = process.env.DBPassw;
  host = process.env.DBHost;
}
const sequelize = new Sequelize(
  database, user, password, { host, dialect: 'mysql', logging: config.inDev },
);
console.log('[DB] Connected!');

checkForMigrations(sequelize);

module.exports = sequelize;
global.sequelize = sequelize;
