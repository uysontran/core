module.exports = function (sequelize) {
  const { Services, APIs, Metadata, ModelChannels, ProtocolConfigs } =
    sequelize.models;

  Services.hasMany(APIs, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  APIs.belongsTo(Services, {
    foreignKey: "MicroserviceID",
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
};
