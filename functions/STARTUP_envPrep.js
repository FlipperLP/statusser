/* eslint-disable no-param-reassign */
const envFile = './config/config.json';

module.exports.run = async (fs, config) => {
  // setting inDev var
  console.log(`[${module.exports.help.name}] Setting environment variables...`);
  if (fs.existsSync(envFile)) {
    const env = require(`.${envFile}`);
    config.inDev = true;
    config.smtpUsername = env.smtp.username;
    config.smtpPassword = env.smtp.password;
    config.smtpHostAdress = env.smtp.hostAdress;
    config.smtpSSLPort = env.smtp.port;
    config.smtpTDLSSLRequired = env.smtp.SSLRequired;
    config.interval = env.checkingInterval.interval;
    config.intervalBetweenServices = env.checkingInterval.betweenServices;
    config.monitoringEmail = env.monitoringEmail;
  } else {
    config.inDev = false;
    config.smtpUsername = process.env.smtpUsername;
    config.smtpPassword = process.env.smtpPassword;
    config.smtpHostAdress = process.env.smtpHostAdress;
    config.smtpPort = process.env.smtpPort;
    config.smtpSSLRequired = process.env.smtpSSLRequired;
    config.interval = process.env.interval;
    config.intervalBetweenServices = process.env.intervalBetweenServices;
    config.monitoringEmail = process.env.monitoringEmail;
  }
  console.log(`[${module.exports.help.name}] Environment variables set!`);
};

module.exports.help = {
  name: 'STARTUP_envPrep',
};
