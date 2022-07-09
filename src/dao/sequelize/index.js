const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  // logging: (msg) => console.log(msg),
});
module.exports.sequelize = sequelize;
module.exports.sync = async function () {
  const models = [
    require("./models/services.model"),
    require("./models/devices.model"),
    require("./models/models.model"),
  ];
  for (const model of models) {
    await model(sequelize);
  }
  await require("./associate")(sequelize);
};
