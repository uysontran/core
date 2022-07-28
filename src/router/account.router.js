module.exports = function () {
  const Router = require("express").Router();
  const { accounts } = require("../controller");
  Router.put("/factory-reset", accounts.factory);
  return Router;
};
