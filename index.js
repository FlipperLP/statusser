(async () => {
  // prepare env vars
  await require('./functions/STARTUP_envPrep').run();
  // get functions
  const functions = await require('./functions/STARTUP_initFunctions').run();

  // create conenction to DB and check DB stucture
  require('./database/SETUP_DBConnection');

  await functions.TCKR_intervall.run(functions);
})();
