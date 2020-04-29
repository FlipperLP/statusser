(async () => {
  await require('./functions/STARTUP_envPrep').run();
  const functions = await require('./functions/STARTUP_initFunctions').run();

  // create conenction to DB
  require('./database/SETUP_DBConnection');

  await functions.TCKR_intervall.run(functions, 'vodafone');
})();
