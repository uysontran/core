const express = require("express");
const path = require("path");
const app = require("express")();
require("./src/utilities");
(async function () {
  //config sqlite3
  const { sync, Config } = require("./src/database");
  await sync();
  await Config.load();
  await require("./src/tasks").boot();
  //config middleware
  require("./src/middleware")(app);
  //config route
  require("./src/router")(app);
  app.use("/app/", express.static(path.join(__dirname, "public")));
  app.get("/app/*", (req, res) =>
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
  const fs = require("fs");
  const logger = process.env.LOG_FILE || "/var/log/core/log.txt";
  const error = process.env.ERR_FILE || "/var/log/core/err.txt";

  let fn = process.stdout.write;
  process.stdout.write = function () {
    let timestamp = new Date().toUTCString().split(" ");
    timestamp.pop();
    timestamp.shift();
    timestamp = timestamp.join("-");
    arguments["0"] = timestamp + " - " + arguments["0"];
    fn.apply(process.stdout, arguments);
    if (global.isLog) {
      fs.appendFile(logger, arguments[0], (err) => {
        if (err) throw err;
      });
    }
  };

  fn = process.stderr.write;
  process.stderr.write = function () {
    let timestamp = new Date().toUTCString().split(" ");
    timestamp.pop();
    timestamp.shift();
    timestamp = timestamp.join("-");
    arguments["0"] = timestamp + " - " + arguments["0"];
    fn.apply(process.stderr, arguments);
    if (global.isLog) {
      fs.appendFile(error, arguments[0], (err) => {
        if (err) throw err;
      });
    }
  };

  console.log("core is running on port 33333");
})();
