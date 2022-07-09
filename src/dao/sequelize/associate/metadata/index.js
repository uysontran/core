module.exports = async function (sequelize) {
  const { Services, Metadata, ModelChannels, ProtocolConfigs } =
    sequelize.models;
  const { DataTypes } = require("sequelize");
  const services = await Services.findAll({ include: [Metadata] });
  for (const service of services) {
    const modelChannels = service.Metadata.filter(
      (e) => e.kind === "ModelChannel"
    );
    let schema = modelChannels.reduce(
      (a, { key, type, values, allowNull, defaultValue, unique }) => {
        return {
          ...a,
          [key]: {
            type: DataTypes[type],
            values,
            allowNull,
            defaultValue,
            unique,
          },
        };
      },
      {}
    );
    const channel = sequelize.define(`ModelChannel_${service.id}`, schema, {
      timestamps: false,
    });
    ModelChannels.hasOne(channel, {
      foreignKey: "ModelChannelID",
      onDelete: "CASCADE",
    });
    channel.belongsTo(ModelChannels, {
      foreignKey: "ModelChannelID",
      onDelete: "CASCADE",
    });

    const protocolConfigs = service.Metadata.filter(
      (e) => e.kind === "ProtocolConfig"
    );
    schema = protocolConfigs.reduce(
      (a, { key, type, values, allowNull, defaultValue, unique }) => {
        return {
          ...a,
          [key]: {
            type: DataTypes[type],
            values,
            allowNull,
            defaultValue,
            unique,
          },
        };
      },
      {}
    );
    const configs = sequelize.define(`ProtocolConfig_${service.id}`, schema, {
      timestamps: false,
    });
    ProtocolConfigs.hasOne(configs, {
      foreignKey: "ProtocolConfigID",
      onDelete: "CASCADE",
    });
    configs.belongsTo(ProtocolConfigs, {
      foreignKey: "ProtocolConfigID",
      onDelete: "CASCADE",
    });
  }
};
