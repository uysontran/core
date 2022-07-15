class Protocol {
  async create({ MicroserviceID, name, ...params }) {
    const {
      models: {
        ProtocolConfigs,
        [`ProtocolConfig_${MicroserviceID}`]: protocolConfig,
      },
    } = require("../sequelize").sequelize;
    try {
      await require("../sequelize").sequelize.transaction(async (t) => {
        return await ProtocolConfigs.create(
          {
            name,
            MicroserviceID,
            [`ProtocolConfig_${MicroserviceID}`]: { ...params, MicroserviceID },
          },
          { include: [protocolConfig], transaction: t }
        );
      });
    } catch (err) {
      throw err;
    }
  }
}
module.exports = new Protocol();
