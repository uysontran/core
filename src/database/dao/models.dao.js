class Models {
  async create({ name, type, manufacture, protocol, channels }) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { Models, ModelChannels, Services, ...other },
    } = sequelize;
    try {
      const { id: MicroserviceID } = await Services.findOne({
        where: { name: protocol },
        attributes: { include: "id" },
      });
      const modelchannels = other[`ModelChannel_${MicroserviceID}`];
      await sequelize.transaction(async (t) => {
        const model = await Models.create(
          { name, type, manufacture, MicroserviceID },
          { transaction: t }
        );
        return await Promise.all(
          channels.map((channel) => {
            const { name, readWrite, offset, scale, precision, ...rest } =
              channel;
            return ModelChannels.create(
              {
                MicroserviceID,
                ModelID: model.id,
                name,
                readWrite,
                offset,
                scale,
                precision,
                [`ModelChannel_${MicroserviceID}`]: rest,
              },
              { include: modelchannels, transaction: t }
            );
          })
        );
      });
    } catch (err) {
      throw err;
    }
  }
  async get(id) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { ModelChannels, Models },
    } = sequelize;
    const { RecurringTasks, Service, Model, ...associations } =
      ModelChannels.associations;
    const result = await Models.findOne({
      where: { id },
      include: [
        {
          model: ModelChannels,
          include: Object.values(associations),
        },
      ],
    });
    return JSON.parse(
      JSON.stringify(result, (k, v) => (v === null ? undefined : v))
    );
  }
}
module.exports = new Models();
