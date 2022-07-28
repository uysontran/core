module.exports.sync = require("./sequelize").sync;
module.exports.Services = require("./dao/services.dao");
module.exports.Models = require("./dao/models.dao.js");
module.exports.Protocol = require("./dao/protocol.dao");
module.exports.Devices = require("./dao/devices.dao");
module.exports.Tasks = require("./dao/task.dao");
module.exports.FlushAll = async () => {
  const { sequelize } = require("./sequelize");
  await sequelize.dropAllSchemas();
  await module.exports.sync();
};
