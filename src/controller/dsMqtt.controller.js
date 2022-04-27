const { mqtts } = require("../model/index");
const axios = require("axios");
module.exports = {
  getAll: async function (req, res) {
    const configs = (
      await mqtts.findAll({
        attributes: {
          exclude: ["id", "deviceId"],
        },
        group: [
          "host",
          "port",
          "protocol",
          "wsOption",
          "keepalive",
          "reschedulePings",
          "reconnectPeriod",
          "connectTimeout",
          "username",
          "password",
          "queueQoZero",
          "qos",
        ],
      })
    ).map((e) => e.toJSON());
    for (const config of configs) {
      config.ids = (
        await mqtts.findAll({
          where: { ...config },
          attributes: ["deviceId"],
        })
      ).map((e) => e.toJSON().deviceId);
    }
    res.send(configs);
  },
  defaultConfig: async function (req, res) {
    try {
      mqtts.findOrCreate({
        where: { deviceId: null },
        defaults: {
          ...req.body,
        },
      });
      try {
        await axios.post("http://127.0.0.1:33335/newClient");
      } catch (err) {
        console.log(err.message);
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
