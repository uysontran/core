module.exports = function (app) {
  const devices = require("./devices.router");
  const gateway = require("./gateway.router");
  const models = require("./model.router");
  const asMqtt = require("./dsMqtt.router");
  app.use("/models", models);
  app.use("/devices", devices);
  app.use("/gateway", gateway);
  app.use("/ds-mqtt/", asMqtt);
};
