module.exports = function () {
  const Router = require("express").Router();
  const { devices } = require("../controller");
  Router.get("/provision", devices.provision);
  Router.post("/", devices.post);
  //   Router.get("/", models.get);
  //   Router.delete("/", models.delete);
  return Router;
};
