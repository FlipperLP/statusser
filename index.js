// init config
const config = require('./config/main.json');

// create new collection in config
config.functions = new Collection();
config.env = new Collection();

(async () => {
  // import Functions
  config.setup.startupFunctions.forEach((FCN) => {
    const INIT = require(`./functions/${FCN}.js`);
    INIT.run(client, fs, config);
  });

  // create conenction to DB
  require('./database/SETUP_DBConnection');

  config.setup.setupFunctions.forEach((FCN) => {
    client.functions.get(FCN).run(client, config);
  });
  console.log(config.functions);
})();
