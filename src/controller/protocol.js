module.exports = {
  async post(req, res) {
    const { MicroserviceID, name, ...otherConfig } = req.body;
    const { sequelize } = require("../sequelize");
    const protocolConfig = sequelize.models[`ProtocolConfig_${MicroserviceID}`];
    const ProtocolConfig = sequelize.models.ProtocolConfig;
    try {
      await sequelize.transaction(async (t) => {
        const result = await ProtocolConfig.create(
          {
            MicroserviceID,
            name,
            [`ProtocolConfig_${MicroserviceID}`]: { ...otherConfig },
          },
          {
            include: [protocolConfig],
            transaction: t,
          }
        );
        return result;
      });

      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  },
  async get(req, res) {
    let { id, name } = req.query;
    const { sequelize } = require("../sequelize");
    const { Microservices, ProtocolConfig } = sequelize.models;
    if (id === undefined && name !== undefined) {
      try {
        id = (await Microservices.findOne({ where: { name } })).toJSON().id;
      } catch (err) {
        return res.sendStatus(400);
      }
    }
    try {
      const protocolConfig = sequelize.models[`ProtocolConfig_${id}`];
      const result = (
        await ProtocolConfig.findAll({
          where: {
            MicroserviceID: id,
          },
          include: [protocolConfig],
        })
      )
        .map((e) => e.toJSON())
        .map((e) => ({ name: e.name, ...e[`ProtocolConfig_${id}`] }));
      res.send(result);
    } catch (err) {
      res.sendStatus(400);
    }
  },
};
