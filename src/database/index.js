module.exports.sync = require("./sequelize").sync;
module.exports.Services = require("./dao/services.dao");
module.exports.Models = require("./dao/models.dao.js");
module.exports.Protocol = require("./dao/protocol.dao");
module.exports.Devices = require("./dao/devices.dao");
module.exports.Tasks = require("./dao/task.dao");
module.exports.Config = require("./dao/configuration.dao");
module.exports.Reset = async () => {
  const { sequelize } = require("./sequelize");
  sequelize.dropAllSchemas();
  await module.exports.sync();
  await module.exports.Config.load();
};
module.exports.FlushData = async () => {
  const { sequelize } = require("./sequelize");
  const { Accounts, Configuration, ...Others } = sequelize.models;
  for (const model of Object.values(Others)) {
    await model.drop();
  }
  const { object } = require("../utilities/");
  const schemaToDrop = object.FilterbyKeys(
    ["ModelChannel_*", "ProtocolConfig_*"],
    Others
  );
  for (const schemaName of Object.keys(schemaToDrop)) {
    await sequelize.dropSchema(schemaName);
  }
  await module.exports.sync();
};
