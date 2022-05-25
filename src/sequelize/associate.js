module.exports = async function (sequelize) {
  const {
    Microservices,
    RESTAttributes,
    ServiceMetaDatas,
    Devices,
    Models,
    RepeatableTasks,
    ReadDeviceData,
    ProtocolConfig,
    ModelChannel,
  } = sequelize.models;

  // Microservice set/get command
  Microservices.hasMany(RESTAttributes, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  RESTAttributes.belongsTo(Microservices, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  // Microservice Metadata
  Microservices.hasMany(ServiceMetaDatas, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  ServiceMetaDatas.belongsTo(Microservices, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  //Device and Model
  Devices.belongsTo(Models, {
    foreignKey: "ModelID",
    onDelete: "CASCADE",
  });
  Models.hasMany(Devices, {
    foreignKey: "ModelID",
    onDelete: "CASCADE",
  });
  //Model and Microservice
  Models.belongsTo(Microservices, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  Microservices.hasMany(Models, {
    foreignKey: "MicroserviceID",
    onDelete: "CASCADE",
  });
  //Device and Task
  Devices.hasMany(RepeatableTasks, {
    foreignKey: "DeviceID",
    onDelete: "CASCADE",
  });
  RepeatableTasks.belongsTo(Devices, {
    foreignKey: "DeviceID",
    onDelete: "CASCADE",
  });
  //Task and Read Device Data task
  RepeatableTasks.hasMany(ReadDeviceData, {
    foreignKey: "TaskID",
    onDelete: "CASCADE",
  });
  ReadDeviceData.belongsTo(RepeatableTasks, {
    foreignKey: "TaskID",
    onDelete: "CASCADE",
  });
  // Read Device Data task and Channels
  ReadDeviceData.belongsTo(ModelChannel, {
    foreignKey: "ChannelID",
  });
  ModelChannel.hasOne(ReadDeviceData, {
    foreignKey: "ChannelID",
  });
  //ModelChannel and Microservices
  ModelChannel.belongsTo(Microservices, {
    foreignKey: "MicroserviceID",
  });
  Microservices.hasMany(ModelChannel, {
    foreignKey: "MicroserviceID",
  });
  //ModelChannel and Model
  ModelChannel.belongsTo(Models, {
    foreignKey: "ModelID",
  });
  Models.hasMany(ModelChannel, {
    foreignKey: "ModelID",
  });
  //ProtocolConfig and Microservices
  ProtocolConfig.belongsTo(Microservices, {
    foreignKey: "MicroserviceID",
  });
  Microservices.hasMany(ProtocolConfig, {
    foreignKey: "MicroserviceID",
  });
  //ProtocolConfig and Device
  ProtocolConfig.hasMany(Devices, {
    foreignKey: "upProtocolID",
  });
  Devices.belongsTo(ProtocolConfig, {
    as: "upProtocol",
    foreignKey: "upProtocolID",
  });
  //
  ProtocolConfig.hasMany(Devices, {
    foreignKey: "downProtocolID",
  });
  Devices.belongsTo(ProtocolConfig, {
    as: "downProtocol",
    foreignKey: "downProtocolID",
  });

  await sequelize.sync();
};
