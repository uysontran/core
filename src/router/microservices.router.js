const Router = require("express").Router();
const { get, post, start, stop } = require("../controller/microservices");
Router.get("/action", start);
Router.delete("/action", stop);
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
