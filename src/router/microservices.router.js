const Router = require("express").Router();
const { get, post } = require("../controller/microservices");
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
