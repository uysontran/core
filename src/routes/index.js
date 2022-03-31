module.exports = function (app) {
  const devices = require("./devices.router");
  const gateway = require("./gateway.router");
  const models = require("./model.router");
  const asMqtt = require("./asMqtt.router");
  app.use("/models", models);
  app.use("/devices", devices);
  app.use("/gateway", gateway);
  app.use("/as-mqtt/", asMqtt);
};
