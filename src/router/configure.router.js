module.exports = function () {
  const Router = require("express").Router();
  const { configure } = require("../controller");
  Router.put("/reset", configure.factory);
  return Router;
};
