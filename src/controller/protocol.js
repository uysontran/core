module.exports = {
  async post(req, res) {
    const { MicroserviceID, ...otherConfig } = req.body;
    const { sequelize } = require("../sequelize");
    const protocolConfig = sequelize.models[`ProtocolConfig_${MicroserviceID}`];
    const ProtocolConfig = sequelize.models.ProtocolConfig;
    try {
      await sequelize.transaction(async (t) => {
        const result = await ProtocolConfig.create(
          {
            MicroserviceID,
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
    const { Microservices } = sequelize.models;
    if (id === undefined && name !== undefined) {
      id = (await Microservices.findOne({ where: { name } })).toJSON().id;
    }
    const protocolConfig = sequelize.models[`ProtocolConfig_${id}`];
    const result = (await protocolConfig.findAll()).map((e) => e.toJSON());
    res.send(result);
  },
};
