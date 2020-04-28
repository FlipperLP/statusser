// init filesystem
const fs = require('fs');
// init config
const config = require('./config/main.json');

(async () => {
  await require('./functions/STARTUP_envPrep').run(fs, config);
  const functions = await require('./functions/STARTUP_initFunctions').run();

  // create conenction to DB
  require('./database/SETUP_DBConnection');

  const serviceName = 'test';
  const status = 'Down';
  const email = 'philip.schaefer311@gmail.com';

  const output = await functions.FUNC_sendEmail.run(serviceName, status, email, config);
})();
