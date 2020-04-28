const fs = require('fs');

const util = require('util');

const readdir = util.promisify(fs.readdir);

const config = require('../config/main.json');

/* eslint-disable no-param-reassign */
module.exports.run = async () => {
  // read directory with functions
  const names = await readdir('./functions').catch((err) => console.error(err));
  const functions = {};
  // removal of '.js' in the end of the file
  const jsfiles = names.filter((f) => f.split('.').pop() === 'js');

  // check if functions are there
  if (jsfiles.length <= 0) return console.log(`[${module.exports.help.name}] No function(s) to load!`);

  if (config.inDev) console.log(`[${module.exports.help.name}] Loading ${jsfiles.length} function(s)...`);

  // adding all functions
  jsfiles.forEach((f, i) => {
    const probs = require(`../functions/${f}`);
    if (config.inDev) console.log(`[${module.exports.help.name}]     ${i + 1}) Loaded: ${f}!`);
    // adding function to collection
    functions[probs.help.name] = probs;
  });

  console.log(`[${module.exports.help.name}] Loaded ${jsfiles.length} function(s)!`);
  return functions;
};

module.exports.help = {
  name: 'STARTUP_initFunctions',
};
