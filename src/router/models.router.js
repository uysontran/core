module.exports = function () {
  const Router = require("express").Router();
  const { models } = require("../controller");
  Router.post("/", models.post);
  //   Router.get("/", models.get);
  //   Router.delete("/", models.delete);
  return Router;
};
