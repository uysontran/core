const Router = require("express").Router();
const { get, post, provision,provisionConfirm } = require("../controller/devices");
Router.post("/provision/confirm", provisionConfirm);
Router.get("/provision", provision);
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
