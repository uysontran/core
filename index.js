const app = require("express")();
(async function () {
  //config sqlite3
  const { sync } = require("./src/database");
  await sync();
  await require("./src/tasks").boot();
  //config middleware
  require("./src/middleware")(app);
  //config route
  require("./src/router")(app);
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
  console.log("core is running on port 33333");
})();
