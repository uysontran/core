module.exports = async function (sequelize) {
  const _ = require("lodash");
  const { DataTypes } = require("sequelize");
  const {
    Microservices,
    ServiceMetaDatas,
    Models,
    ModelChannel,
    ProtocolConfig,
  } = sequelize.models;
  const services = (
    await Microservices.findAll({
      include: [ServiceMetaDatas],
    })
  ).map((e) => e.toJSON());
  for (const service of services) {
    const modelchannel = service.ServiceMetaDatas.filter(
      (e) => e.kind === "ModelChannel"
    ).reduce((a, b) => {
      const returnOb = {
        type: DataTypes[b.type],
        allowNull: b.allowNull,
        defaultValue: b.defaultValue,
      };
      if (b.unique) returnOb.unique = b.unique;
      if (b.values) returnOb.values = JSON.parse(b.values);
      return { ...a, [b.key]: returnOb };
    }, {});
    if (!_.isEmpty(modelchannel)) {
      const modelChannel = sequelize.define(
        `ModelChannel_${service.id}`,
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            unique: true,
          },
          ReadWrite: {
            type: DataTypes.ENUM,
            values: ["R", "W", "RW"],
          },
          Offset: {
            type: DataTypes.REAL,
            defaultValue: 0,
          },
          Scale: {
            type: DataTypes.REAL,
            defaultValue: 1,
          },
          ...modelchannel,
        },
        {
          timestamps: false,
        }
      );
      ModelChannel.hasOne(modelChannel, {
        foreignKey: "ModelChannelID",
      });
      modelChannel.belongsTo(ModelChannel, {
        foreignKey: "ModelChannelID",
      });
    }

    const protocolConfig = service.ServiceMetaDatas.filter(
      (e) => e.kind === "ProtocolConfig"
    ).reduce((a, b) => {
      const returnOb = {
        type: DataTypes[b.type],
        allowNull: b.allowNull,
        defaultValue: b.defaultValue,
      };
      if (b.unique) returnOb.unique = b.unique;
      if (b.values) returnOb.values = b.values;
      return { ...a, [b.key]: returnOb };
    }, {});
    if (!_.isEmpty(protocolConfig)) {
      const instance = sequelize.define(
        `ProtocolConfig_${service.id}`,
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          ...protocolConfig,
        },
        {
          timestamps: false,
        }
      );
      ProtocolConfig.hasOne(instance, {
        foreignKey: "ProtocolID",
      });
      instance.belongsTo(ProtocolConfig, {
        foreignKey: "ProtocolID",
      });
    }
  }
  await sequelize.sync();
};
