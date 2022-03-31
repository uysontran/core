const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  // logging: (msg) => require("../utils/debug")("sqlite3")(msg),
});
(async function () {
  const debug = require("../utils/debug")("sqlite3");
  try {
    await sequelize.authenticate();
    debug("Connection has been established successfully.");
  } catch (error) {
    checkForConnection();
  }
})();
module.exports = sequelize;
