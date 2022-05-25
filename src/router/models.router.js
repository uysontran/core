const Router = require("express").Router();
const { get, post } = require("../controller/model");
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
