let client;
(async () => {
  const debug = require("../utils/debug")("redis");
  try {
    const { createClient } = require("redis");
    client = createClient();
    client.on("error", (err) => {
      if (err.code === "ECONNREFUSED") {
      } else {
        debug(err);
      }
    });
    client.on("ready", () => {
      debug("Redis ready!");
    });
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      debug(err);
    } else {
      console.log(err);
    }
  }
})();
module.exports = { client };
