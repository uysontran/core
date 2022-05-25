const { log } = require("./src/utility/debug")("core: ");
const app = require("express")();
(async function () {
  const { sync, sequelize } = require("./src/sequelize");
  await sync();
  //check database connection

  //if can't connect to db, exit the program

  await require("./src/pm2").startUp();
  await require("./src/bull").LoadAllTask();
  //config middleware
  require("./src/middleware")(app);

  //config route
  require("./src/router")(app);

  //run server
  const port = process.env.PORT || 33333;
  app.listen(port, () => log("running on port " + port));
})();
