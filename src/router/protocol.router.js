const Router = require("express").Router();
const { get, post } = require("../controller/protocol");
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
