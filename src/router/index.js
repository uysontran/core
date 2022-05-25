module.exports = function (app) {
  app.use("/microservices", require("./microservices.router"));
  app.use("/models", require("./models.router"));
  app.use("/devices", require("./devices.router"));
  app.use("/protocol", require("./protocol.router"));
  app.use("/tasks", require("./task.router"));
};
