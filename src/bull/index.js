const Queue = require("bull");
const readDeviceData = new Queue("readDeviceData");

const emptyQueue = async (q) => {
  const getKeys = async (q) => {
    const multi = q.multi();
    multi.keys("*");
    const keys = await multi.exec();
    return keys[0][1];
  };

  const filterQueueKeys = (q, keys) => {
    const prefix = `${q.keyPrefix}:${q.name}`;
    return keys.filter((k) => k.includes(prefix));
  };

  const deleteKeys = async (q, keys) => {
    const multi = q.multi();
    keys.forEach((k) => multi.del(k));
    await multi.exec();
  };
  const keys = await getKeys(q);
  const queueKeys = filterQueueKeys(q, keys);
  await deleteKeys(q, queueKeys);
};

readDeviceData.process("readDeviceData", async function (job, done) {
  const data = JSON.parse(job.data);
  const axios = require("axios");
  try {
    let status = "online";
    const results = [];
    for (const channel of data.channels) {
      try {
        results.push(
          await axios[data.downProtocolMethod.method](
            `http://${data.downProtocolMethod.host}:${data.downProtocolMethod.port}${data.downProtocolMethod.path}`,
            {
              data: {
                ...channel,
                ...data.downProtocol,
              },
            }
          )
        );
      } catch (err) {
        status = "offline";
        break;
      }
    }
    const result = results
      .map((e) => {
        const key = Object.keys(e.data)[0];
        const value = e.data[Object.keys(e.data)[0]];
        const { Scale, Offset, precision } = data.channels.find(
          (e) => e.name === key
        );
        if (precision !== null) {
          return { [key]: ((value + Offset) * Scale).toFixed(precision) };
        } else {
          return { [key]: (value + Offset) * Scale };
        }
      })
      .reduce((a, b) => ({ ...a, ...b }), {});

    let package = {};
    if (status === "offline") {
      package = {
        deviceId: data.token,
        timestamp: new Date(new Date().setMilliseconds(0)).toISOString(),
        status,
      };
    } else {
      package = {
        deviceId: data.token,
        timestamp: new Date(new Date().setMilliseconds(0)).toISOString(),
        status,
        ...result,
      };
    }
    try {
      await axios[data.upProtocolMethod.method](
        `http://${data.upProtocolMethod.host}:${data.upProtocolMethod.port}${data.upProtocolMethod.path}`,
        {
          data: {
            package: [package],
            protocol: data.upProtocol,
          },
        }
      );
    } catch (err) {}
  } catch (err) {
    console.log(err);
  }

  readDeviceData.clean(10);
  readDeviceData.clean(10, "failed");
  done();
});
emptyQueue(readDeviceData);
module.exports = {
  readDeviceData: async function (id) {
    const { sequelize } = require("../sequelize");
    const {
      RepeatableTasks,
      ReadDeviceData,
      Devices,
      ModelChannel,
      RESTAttributes,
    } = sequelize.models;
    const task = (
      await RepeatableTasks.findOne({
        where: { id },
        include: [
          {
            model: Devices,
            include: ["upProtocol", "downProtocol"],
          },
          {
            model: ReadDeviceData,
            include: [ModelChannel],
          },
        ],
      })
    ).toJSON();
    const Modelchannels = task.ReadDeviceData.map((e) => e.ModelChannel);
    const channels = (
      await Promise.all(
        Modelchannels.map((e) => {
          const channels = sequelize.models[`ModelChannel_${e.MicroserviceID}`];
          return channels.findOne({
            where: { ModelChannelID: e.id },
            attributes: { exclude: ["id", "ModelChannelID"] },
          });
        })
      )
    ).map((e) => e.toJSON());
    const downProtocolConfig =
      sequelize.models[
        `ProtocolConfig_${task.Device.downProtocol.MicroserviceID}`
      ];
    const downProtocol = (
      await downProtocolConfig.findOne({
        where: { ProtocolID: task.Device.downProtocol.id },
        attributes: { exclude: ["id", "ProtocolID"] },
      })
    ).toJSON();
    const downProtocolMethod = (
      await RESTAttributes.findOne({
        where: {
          MicroserviceID: task.Device.downProtocol.MicroserviceID,
          type: "get",
        },
      })
    ).toJSON();
    const upProtocolConfig =
      sequelize.models[
        `ProtocolConfig_${task.Device.upProtocol.MicroserviceID}`
      ];
    const upProtocol = (
      await upProtocolConfig.findOne({
        where: { ProtocolID: task.Device.upProtocol.id },
        attributes: { exclude: ["id"] },
      })
    ).toJSON();
    const upProtocolMethod = (
      await RESTAttributes.findOne({
        where: {
          MicroserviceID: task.Device.upProtocol.MicroserviceID,
          type: "set",
        },
      })
    ).toJSON();
    const data = JSON.stringify({
      channels,
      downProtocol,
      upProtocol,
      upProtocolMethod,
      downProtocolMethod,
      token: task.Device.token,
    });
    const { interval, startTime, scheduleType } = task;
    const repeat = {
      startDate: new Date(startTime),
    };
    if (scheduleType === "CRON") {
      repeat.cron = interval;
    } else if (scheduleType === "Periodic") {
      repeat.every = parseInt(interval);
    }
    try {
      await readDeviceData.add("readDeviceData", data, {
        jobId: id,
        repeat,
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteJob: async function ({ id = null }) {
    const job = (await dsModbus.getRepeatableJobs()).find(
      (e) => parseInt(e.id) === id
    );
    await dsModbus.removeRepeatableByKey(job.key);
  },
  async LoadAllTask(req, res) {
    const { sequelize } = require("../sequelize");
    const { RepeatableTasks } = sequelize.models;
    const tasks = (
      await RepeatableTasks.findAll({ where: { status: "running" } })
    ).map((e) => e.toJSON().id);
    for (const task of tasks) {
      module.exports.readDeviceData(task);
    }
  },
};
