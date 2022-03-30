const debug = require("../utils/debug")("app/newDevices");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
  mqtts,
  modbusChannels,
} = require("../model/index");
const { Op } = require("sequelize");
const { newJob, deleteJob } = require("../config/bull");
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
    debug(err);
    return err;
  }
}
getAllSchedule();
async function getSchedule({ name = null, id = null }) {
  try {
    const result = (
      await devices.findOne({
        where: {
          [Op.and]: {
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
            [Op.or]: { name: name, id: id },
          },
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
    ).toJSON();
    if (result) {
      result.channels = result.model[result.model.type];
      delete result.model;
      if (result.modbusRTU === null) {
        delete result.modbusRTU;
      }
      if (result.modbusTCP === null) {
        delete result.modbusTCP;
      }
      newJob(result);
    } else {
      throw new Error();
    }
  } catch (err) {
    debug(err);
    throw new Error(err);
  }
}
module.exports = {
  new: async function (req, res) {
    const {
      name,
      interval,
      downProtocol,
      upProtocol,
      startTime,
      modelId,
      isProvision,
      isPersistence,
    } = req.body;
    if (upProtocol) {
      if (upProtocol.type === "mqtt" && upProtocol.wsOption !== undefined) {
        upProtocol.wsOption = JSON.stringify(upProtocol.wsOption);
      }
    }
    try {
      const deviceInstance = {
        name,
        interval,
        downProtocol: downProtocol.type,
        startTime,
        modelId: modelId,
        isProvision,
        isPersistence,
        [downProtocol.type]: {
          ...downProtocol,
        },
      };
      if (upProtocol) {
        Object.assign(deviceInstance, {
          upProtocol: upProtocol.type,
          [upProtocol.type]: {
            ...upProtocol,
          },
        });
      }
      await devices.create(deviceInstance, {
        include: [
          { association: devices.modbusRTUs },
          { association: devices.modbusTCPs },
          { association: devices.mqtts },
        ],
      });
      getSchedule({ name: name });
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      try {
        if (err.errors[0].message === "name must be unique") {
          throw new Error("Device name existed");
        }
        if (
          err.parent.table !== "devices" &&
          err.message === "Validation error"
        ) {
          try {
            (await devices.findOne({ name: name })).destroy();
          } catch (err) {
            throw new Error(err);
          }
        } else {
          throw new Error("Not handled error");
        }
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  },
  delete: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      const device = await devices.findOne({
        where: { [Op.or]: { name: name, id: id } },
      });
      deleteJob({ id: device.id });
      device.destroy();
      return res.sendStatus(200);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
  get: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      const result = await devices.findOne({
        where: { [Op.or]: { name: name, id: id } },
        include: [
          { model: models, include: [modbusChannels] },
          { model: modbusRTUs },
          { model: modbusTCPs },
          { model: mqtts },
        ],
      });
      if (result) {
        return res.send(result.toJSON());
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
  getDevicesInfo: async function (req, res) {
    try {
      const result = await devices.findAll({
        include: [
          { model: models },
          { model: modbusRTUs },
          { model: modbusTCPs },
          { model: mqtts },
        ],
      });
      if (result) {
        return res.send(result.map((e) => e.toJSON()));
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
};
