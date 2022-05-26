const Router = require("express").Router();
const { get, post, info } = require("../controller/model");
Router.get("/info", info);
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
