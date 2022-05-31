const Router = require("express").Router();
const {
  get,
  post,
  provision,
  info,
  provisionConfirm,
} = require("../controller/devices");
Router.get("/info", info);
Router.get("/provision", provision);
Router.get("provision/confirm", provisionConfirm);
Router.post("/", post);
Router.get("/", get);
module.exports = Router;
