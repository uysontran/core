module.exports = async function (sequelize) {
  require("./service")(sequelize);
  await sequelize.sync();
  await require("./metadata")(sequelize);
  await sequelize.sync();
  require("./devices")(sequelize);
  require("./tasks")(sequelize);
  await sequelize.sync();
};
