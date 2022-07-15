module.exports = function () {
  const Router = require("express").Router();
  const { tasks } = require("../controller");
  Router.post("/", tasks.post);
  Router.get("/", tasks.get);
  //   Router.delete("/", tasks.delete);
  return Router;
};
