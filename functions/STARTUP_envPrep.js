const envFile = './config/config.json';

module.exports.run = async (client, fs, config) => {
  // setting inDev var
  console.log(`[${module.exports.help.name}] Setting environment variables...`);
  if (fs.existsSync(envFile)) {
    const env = require(`.${envFile}`);
    config.env.set('inDev', true);
    config.env.set('smtpUsername', env.smtp.username);
    config.env.set('smtpPassword', env.smtp.password);
    config.env.set('smtpHostAdress', env.smtp.hostAdress);
    config.env.set('smtpTLSPort', env.smtp.TLSPort);
    config.env.set('smtpSSLPort', env.smtp.SSLPort);
    config.env.set('smtpTDLSSLRequired', env.smtp.TDLSSLRequired);
  } else {
    config.env.set('inDev', false);
    config.env.set('smtpUsername', process.env.smtpUsername);
    config.env.set('smtpPassword', process.env.smtpPassword);
    config.env.set('smtpHostAdress', process.env.smtpHostAdress);
    config.env.set('smtpTLSPort', process.env.smtpTLSPort);
    config.env.set('smtpSSLPort', process.env.smtpSSLPort);
    config.env.set('smtpTDLSSLRequired', process.env.smtpTDLSSLRequired);
  }
  console.log(`[${module.exports.help.name}] Environment variables set!`);
};

module.exports.help = {
  name: 'STARTUP_envPrep',
};
