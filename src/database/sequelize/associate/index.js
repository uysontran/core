module.exports = async function (sequelize) {
  await require("./service")(sequelize);
  await require("./metadata")(sequelize);
  await require("./devices")(sequelize);
  await require("./tasks")(sequelize);
};
