require("./src/utilities");
const express = require("express");
const app = express();
(async () => {
  await require("./src/database/").sync();

  //config middleware
  require("./src/middleware")(app, express);
  //config route
  require("./src/router")(app, express);

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
  process.on("__log", (msg) => {
    io.emit("__log", msg);
  });
  process.on("__error", (msg) => {
    io.emit("__error", msg);
  });
})()
  .then(() => console.log("core is listening on port 33333"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
