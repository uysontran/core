const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  // transactionType: "IMMEDIATE",
  // logging: (msg) => console.log(msg),
});
module.exports.sequelize = sequelize;
module.exports.sync = async function () {
  const models = [
    require("./models/configure.model"),
    require("./models/services.model"),
    require("./models/devices.model"),
    require("./models/models.model"),
    require("./models/tasks.models"),
    require("./models/accounts.model"),
  ];
  for (const model of models) {
    await model(sequelize);
  }
  await require("./associate")(sequelize);
};
