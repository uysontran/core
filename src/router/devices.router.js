const Router = require("express").Router();
const { get, post, provision } = require("../controller/devices");
Router.get("/provision", provision);
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
