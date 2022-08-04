module.exports = async function (sequelize) {
  const { ModelChannels, ProtocolConfigs, Devices, Models } = sequelize.models;

  Models.hasMany(Devices, {
    foreignKey: "ModelID",
    onDelete: "CASCADE",
  });
  Devices.belongsTo(Models, {
    foreignKey: "ModelID",
    onDelete: "CASCADE",
  });

  ProtocolConfigs.hasMany(Devices, {
    foreignKey: "upProtocolID",
    onDelete: "CASCADE",
  });
  Devices.belongsTo(ProtocolConfigs, {
    as: "upProtocol",
    foreignKey: "upProtocolID",
    onDelete: "CASCADE",
  });

  ProtocolConfigs.hasOne(Devices, {
    foreignKey: "downProtocolID",
    onDelete: "CASCADE",
  });
  Devices.belongsTo(ProtocolConfigs, {
    as: "downProtocol",
    foreignKey: "downProtocolID",
    onDelete: "CASCADE",
  });

  Models.hasMany(ModelChannels, {
    foreignKey: "ModelID",
    onDelete: "CASCADE",
  });
  ModelChannels.belongsTo(Models, {
    foreignKey: "ModelID",
    onDelete: "CASCADE",
  });
  await ModelChannels.sync();
  await ProtocolConfigs.sync();
  await Devices.sync();
  await Models.sync();
};
