module.exports = function () {
  const Router = require("express").Router();
  const { services } = require("../controller");
  Router.post("/", services.post);
  Router.get("/", services.get);
  Router.delete("/", services.delete);
  return Router;
};
