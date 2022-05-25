const { Sequelize } = require("sequelize");
const { log, error } = require("../utility/debug")("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  // logging: (msg) => log(msg),
});
module.exports.sequelize = sequelize;
module.exports.sync = async function () {
  //create static table and static associate
  const models = [
    require("./models/registry.model"),
    require("./models/device.model"),
    require("./models/task.model"),
  ];
  for (const model of models) {
    await model(sequelize);
  }
  await require("./associate")(sequelize);

  // create dynamic table and dynamic associate
  try {
    await require("./models/metadata.model")(sequelize);
  } catch (err) {
    console.log(err);
  }
  module.exports.microserviceSync = async function () {
    await require("./models/metadata.model")(sequelize);
  };
  try {
    await sequelize.authenticate();
    log("Connected to database");
  } catch (err) {
    error("Unable to connect to the database:");
    error(err.message);
    process.exit(1);
  }
};
