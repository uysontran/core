module.exports = {
  post: async function (req, res) {
    // const { log, error } = require("../utility/debug")("microservices");
    const { sequelize, microserviceSync } = require("../sequelize");
    const { Microservices, ServiceMetaDatas, RESTAttributes } =
      sequelize.models;
    try {
      await sequelize.transaction(async (t) => {
        const result = await Microservices.create(req.body, {
          include: [ServiceMetaDatas, RESTAttributes],
          transaction: t,
        });
        return result;
      });
      await microserviceSync();
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
  get: async function (req, res) {
    // const { log, error } = require("../utility/debug")("router");
    const models = require("../sequelize").sequelize.models;
    const { Microservices, ServiceMetaDatas, RESTAttributes } = models;
    try {
      const result = await Microservices.findAll({
        include: [ServiceMetaDatas, RESTAttributes],
      });
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  start: async function (req, res) {
    const { id } = req.query;
    if ({ id }) {
      const { startMicroservice } = require("../pm2");
      res.send(await startMicroservice(id));
    } else {
      res.sendStatus(400);
    }
  },
  stop: async function (req, res) {
    const { id } = req.query;
    if ({ id }) {
      const { stopMicroservice } = require("../pm2");
      console.log(id);
      res.send(await stopMicroservice(id));
    } else {
      res.sendStatus(400);
    }
  },
};
