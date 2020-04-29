(async () => {
  // prepare env vars
  await require('./functions/STARTUP_envPrep').run();
  // create conenction to DB and check DB stucture
  await require('./database/SETUP_DBConnection');
  // get functions
  const functions = await require('./functions/STARTUP_initFunctions').run();

  await functions.TCKR_downdetector.run(functions);
})();
