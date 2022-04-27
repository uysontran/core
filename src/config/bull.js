const Queue = require("bull");
const dsModbus = new Queue("ds-modbus");

const { client } = require("./redis");
const emptyQueue = async (q) => {
  const debug = require("../utils/debug")("task");
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
  debug("bull is ready");
};

dsModbus.process("ds-modbus", async function (job, done) {
  const data = JSON.parse(job.data);
  const { name, channels, downProtocol, isProvision, upProtocol } = data;
  const debug = require("../utils/debug")(`task:devices ${name}:`);
  const axios = require("axios");
  // debug("reading devices");
  try {
    const gatewayId = await new Promise((resolve, reject) => {
      client.get("gatewayId", (err, reply) => {
        resolve(reply);
        reject(err);
      });
    });
    switch (downProtocol) {
      case "modbusRTU":
      case "modbusTCP":
        let status = "active";
        const results = [];
        for (const channel of channels) {
          try {
            const result = await axios.post(
              `${process.env.DSMODBUS || "http://127.0.0.1:33334"}/action/${
                downProtocol.split("modbus")[1]
              }`,
              {
                ...data[downProtocol],
                ...channel,
              }
            );
            results.push(result);
          } catch (err) {
            console.log(err.response.data);
            status = "inactive";
            break;
          }
        }
        const resultAsObject = results.reduce(
          (pre, curr) => Object.assign(pre, curr.data),
          {}
        );
        const package = {
          gatewayId,
          timestamp: new Date().toISOString(),
          status,
        };
        if (status === "active") {
          package.devices = {
            [name]: resultAsObject,
          };
        }
        if (isProvision === true) {
          switch (upProtocol) {
            case null:
            case "mqtt":
              if (gatewayId !== null) {
                axios
                  .post(
                    (process.env.MQTT || "http://127.0.0.1:33335") +
                      "/telemetry",
                    {
                      id: data.mqtt?.deviceId || null,
                      package,
                    }
                  )
                  .then()
                  .catch(console.log);
              }
              break;
            default:
          }
        }
        break;
      default:
        throw new Error("protocol not supported");
    }
  } catch (err) {}
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
    const job = (await dsModbus.getRepeatableJobs()).find(
      (e) => parseInt(e.id) === id
    );
    await dsModbus.removeRepeatableByKey(job.key);
  },
};
