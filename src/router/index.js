module.exports = function (app) {
  app.use("/protocol", require("./protocol.router")());
  app.use("/services", require("./services.router")());
  app.use("/models", require("./models.router")());
  app.use("/devices", require("./devices.router")());
  app.use("/tasks", require("./tasks.router")());
};
