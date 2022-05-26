const Router = require("express").Router();
const { get, post, provision ,info} = require("../controller/devices");
Router.get("/info",info)
Router.get("/provision", provision);
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
