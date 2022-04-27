const controller = require("../controller/dsMqtt.controller");
const Router = require("express").Router();
Router.get("/getAll", controller.getAll);
Router.put("/default", controller.defaultConfig);
module.exports = Router;
