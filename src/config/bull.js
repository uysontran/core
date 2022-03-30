const Queue = require("bull");
const dsModbus = new Queue("ds-modbus");
const debug = require("../utils/debug")("task");
const { client } = require("./redis");
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

dsModbus.process("ds-modbus", async function (job, done) {
  const axios = require("axios");
  const data = JSON.parse(job.data);
  const { name, channels, southProtocol, isProvision, northProtocol } = data;

  try {
    // const gatewayId = await new Promise((resolve, reject) => {
    //   client.get("gatewayId", (err, reply) => {
    //     resolve(reply);
    //     reject(err);
    //   });
    // });
    const gatewayId = "1234";
    switch (southProtocol) {
      case "modbusRTU":
      case "modbusTCP":
        const result = await Promise.all(
          channels.map((e) =>
            axios.post(
              `${process.env.DSMODBUS || "http://127.0.0.1:33336"}/action/${
                southProtocol.split("modbus")[1]
              }`,
              {
                ...data[southProtocol],
                ...e,
              }
            )
          )
        );
        const resultAsObject = result.reduce(
          (pre, curr) => Object.assign(pre, curr.data),
          {}
        );
        const package = {
          gatewayId,
          timestamp: new Date().toISOString(),
          devices: {
            [name]: resultAsObject,
          },
        };
        if (isProvision === true) {
          switch (northProtocol) {
            case null:
            case "mqtt":
              axios
                .post(
                  (process.env.MQTT || "http://127.0.0.1:33337") + "/telemetry",
                  {
                    id: data.mqtt?.deviceId || null,
                    package,
                  }
                )
                .then()
                .catch(debug);
              break;
            default:
          }
        }
        res.sendStatus(200);
        break;
      default:
        throw new Error("protocol not supported");
    }
  } catch (err) {
    debug(err);
  }
  dsModbus.clean(10);
  dsModbus.clean(10, "failed");
  done();
});
emptyQueue(dsModbus);
module.exports = {
  newJob: async function (details) {
    const { id, interval, startTime } = details;
    function parseTime(startTime) {
      if (startTime) {
        const pass = new Date(startTime).getTime();
        const now = Date.now();
        const count = (now - pass - ((now - pass) % interval)) / interval + 2;
        return new Date(pass + count * interval);
      } else {
        return new Date();
      }
    }
    delete details.interval;
    delete details.startTime;
    const data = JSON.stringify(details);
    try {
      const job = await dsModbus.add("ds-modbus", data, {
        jobId: id,
        delay: 0,
        repeat: {
          every: parseInt(interval),
          startDate: parseTime(startTime),
        },
      });
      job.opts.repeat.key;
    } catch (err) {
      console.log(err);
    }
  },
  deleteJob: async function ({ id = null }) {
    const job = (await dsModbus.getRepeatableJobs()).find((e) => e.id === id);
    await dsModbus.removeRepeatableByKey(job.key);
  },
};
