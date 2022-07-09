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
    foreignKey: "upProtocolID",
    onDelete: "CASCADE",
  });

  ProtocolConfigs.hasOne(Devices, {
    foreignKey: "downProtocolID",
    onDelete: "CASCADE",
  });
  Devices.belongsTo(ProtocolConfigs, {
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
};
