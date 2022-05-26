module.exports = {
  async post(req, res) {
    const { sequelize } = require("../sequelize");
    const { Models, Microservices, ModelChannel } = sequelize.models;
    const { ProtocolType } = req.body;
    const service = (
      await Microservices.findOne({
        where: {
          name: ProtocolType,
        },
      })
    ).toJSON();
    const modelChannel = sequelize.models[`ModelChannel_${service.id}`];
    try {
      const { name, type, manufacture, channels } = req.body;
      await sequelize.transaction(async (t) => {
        const result = await Models.create(
          {
            name,
            type,
            manufacture,
            MicroserviceID: service.id,
            ModelChannels: channels.map((e) => ({
              MicroserviceID: service.id,
              [`ModelChannel_${service.id}`]: e,
            })),
          },
          {
            include: [
              {
                model: ModelChannel,
                include: [modelChannel],
              },
            ],
            transaction: t,
          }
        );
        return result;
      });
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
  async get(req, res) {
    res.sendStatus(200);
  },
  async info(req, res) {
    const { sequelize } = require("../sequelize");
    const { Models, ModelChannel } = sequelize.models;
    const models = (
      await Models.findAll({
        include: [ModelChannel],
      })
    ).map((e) => e.toJSON());
    for (const model of models) {
      const ModelChannel_ =
        sequelize.models["ModelChannel_" + model.MicroserviceID];
      const channels = (
        await ModelChannel.findAll({
          where: {
            ModelID: model.id,
          },
          include: [ModelChannel_],
        })
      ).map((e) => e.toJSON()["ModelChannel_" + model.MicroserviceID]);
      model.ModelChannels = channels;
    }
    res.send(models);
  },
};
