module.exports = function (type) {
  const DEBUG = require("debug");
  const debug = DEBUG("core");
  debug.log = console.log.bind(console);
  DEBUG.enable("core:*");
  return debug.extend(type);
};
