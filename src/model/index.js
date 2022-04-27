const { modbusRTUs, modbusTCPs } = require("./downProtocol.model");
const { models, modbusChannels } = require("./model.model");
const { devices } = require("./device.model");
const { gatewayInfo } = require("./gateway.model");
const { mqtts } = require("./upProtocol.model");
(async function () {
  devices.modbusRTUs = devices.hasOne(modbusRTUs, {
    foreignKey: "deviceId",
    onDelete: "CASCADE",
  });
  devices.modbusTCPs = devices.hasOne(modbusTCPs, {
    foreignKey: "deviceId",
    onDelete: "CASCADE",
  });
  devices.mqtts = devices.hasOne(mqtts, {
    foreignKey: "deviceId",
    onDelete: "CASCADE",
  });
  mqtts.devices = mqtts.belongsTo(devices, {
    foreignKey: "deviceId",
    onDelete: "CASCADE",
  });
  devices.models = devices.belongsTo(models, {
    foreignKey: { name: "modelId", allowNull: true },
  });
  models.hasOne(devices, {
    foreignKey: { name: "modelId", allowNull: true },
  });
  models.modbusChannels = models.hasMany(modbusChannels, {
    foreignKey: "modelId",
    onDelete: "CASCADE",
  });
  const debug = require("../utils/debug")("model");
  const sequelize = require("../config/sequelize");
  const { Op } = require("sequelize");
  const { newJob } = require("../config/bull");
  try {
    await sequelize.sync();
    debug("All models were synchronized successfully.");
    async function getAllSchedule() {
      try {
        const result = (
          await devices.findAll({
            where: {
              [Op.or]: [
                {
                  isProvision: {
                    [Op.not]: false,
                  },
                },
                {
                  isPersistence: { [Op.not]: false },
                },
              ],
            },
            attributes: { exclude: ["modelId"] },
            include: [
              {
                model: models,
                include: [
                  {
                    model: modbusChannels,
                    attributes: { exclude: ["modelId"] },
                  },
                ],
              },
              {
                model: modbusRTUs,
                attributes: { exclude: ["deviceId", "id"] },
              },
              {
                model: modbusTCPs,
                attributes: { exclude: ["deviceId", "id"] },
              },
              {
                model: mqtts,
                attributes: ["id"],
              },
            ],
          })
        ).map((e) => e.toJSON());
        if (result) {
          result.forEach((e) => {
            e.channels = e.model[e.model.type];
            delete e.model;
            if (e.modbusRTU === null) {
              delete e.modbusRTU;
            }
            if (e.modbusTCP === null) {
              delete e.modbusTCP;
            }
          });
          result.forEach((e) => newJob(e));
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
    getAllSchedule();
  } catch (err) {
    if (
      err.message === 'database "core" does not exist' ||
      err.message === "read ECONNRESET"
    ) {
      sync();
    } else {
      debug(err.message);
    }
  }
})();

module.exports = {
  modbusRTUs,
  modbusTCPs,
  models,
  modbusChannels,
  devices,
  gatewayInfo,
  mqtts,
};
