const controller = require("../controller/asMqtt.controller");
const Router = require("express").Router();
Router.get("/getAll", controller.getAll);
Router.put("/default", controller.defaultConfig);
module.exports = Router;
