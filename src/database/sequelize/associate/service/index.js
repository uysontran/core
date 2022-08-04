module.exports = async function (sequelize) {
  const { Services, APIs, Metadata, ModelChannels, ProtocolConfigs, RESTs } =
    sequelize.models;

  Services.hasMany(APIs, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  APIs.belongsTo(Services, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });

  APIs.hasOne(RESTs, {
    foreignKey: "API_ID",
    onDelete: "CASCADE",
  });
  RESTs.belongsTo(APIs, {
    foreignKey: "API_ID",
    onDelete: "CASCADE",
  });
  Services.hasMany(Metadata, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  Metadata.belongsTo(Services, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });

  Services.hasMany(ModelChannels, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  ModelChannels.belongsTo(Services, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });

  Services.hasMany(ProtocolConfigs, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  ProtocolConfigs.belongsTo(Services, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });

  await Services.sync();
  await APIs.sync();
  await Metadata.sync();
  await ModelChannels.sync();
  await ProtocolConfigs.sync();
  await RESTs.sync();
};
