module.exports = function () {
  const Router = require("express").Router();
  const { protocol } = require("../controller");
  Router.post("/", protocol.post);
  //   Router.get("/", services.get);
  //   Router.delete("/", services.delete);
  return Router;
};
