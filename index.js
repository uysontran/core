const { log } = require("./src/utility/debug")("core: ");
const app = require("express")();
(async function () {
  const path = require("path");
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
  app.use(require("express").static(path.join(__dirname, "public")));
  app.get("/*", (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html"))
  );
  //run server
  const port = process.env.PORT || 33333;
  const { createServer } = require("http");
  const httpServer = createServer(app);
  const io = require("socket.io")(httpServer, {
    cors: {
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  httpServer.listen(port);
  io.on("connection", (client) => {
    require("./src/io")(client);
  });
})();
