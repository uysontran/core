module.exports = function () {
  const Router = require("express").Router();
  const { devices } = require("../controller");
  Router.post("/", devices.post);
  //   Router.get("/", models.get);
  //   Router.delete("/", models.delete);
  return Router;
};
