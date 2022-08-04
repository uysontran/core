module.exports = function () {
  const Router = require("express").Router();
  const { devices } = require("../controller");
  Router.get("/provision", devices.provision);
  Router.post("/", devices.post);
  Router.get("/info", devices.getInformation);
  Router.delete("/", devices.delete);
  //   Router.delete("/", models.delete);
  return Router;
};
