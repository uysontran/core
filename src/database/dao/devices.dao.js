class Devices {
  async create(device) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { Devices },
    } = sequelize;
    try {
      await Devices.create(device);
    } catch (err) {
      throw err;
    }
  }
  async find(id) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: {
        Devices,
        Models,
        ModelChannels,
        ProtocolConfigs,
        APIs,
        Services,
      },
    } = sequelize;
    try {
      const { object } = require("../../utilities");
      const modelChannels = Object.values(
        object.FilterbyKeys(["ModelChannel_*"], ModelChannels.associations)
      );
      const ProtocolModels = Object.values(
        object.FilterbyKeys(["ProtocolConfig*"], ProtocolConfigs.associations)
      );
      let IPC = object.FilterbyKeys("!Service", APIs.associations);
      IPC = Object.values(IPC);
      let result = (
        await Devices.findByPk(id, {
          include: [
            {
              model: Models,
              include: [{ model: ModelChannels, include: modelChannels }],
            },
            {
              model: ProtocolConfigs,
              as: "upProtocol",
              include: [
                ...ProtocolModels,
                {
                  model: Services,
                  include: [
                    {
                      model: APIs,
                      include: IPC,
                    },
                  ],
                },
              ],
            },
            {
              model: ProtocolConfigs,
              as: "downProtocol",
              include: [
                ...ProtocolModels,
                {
                  model: Services,
                  include: [
                    {
                      model: APIs,
                      include: IPC,
                    },
                  ],
                },
              ],
            },
          ],
        })
      ).toJSON();

      result = JSON.parse(
        JSON.stringify(result, (k, v) => (v === null ? undefined : v))
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async upDate(id, device) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { Devices },
    } = sequelize;
    const instance = await Devices.findByPk(id);
    try {
      await instance.update(device);
      await instance.save();
    } catch (err) {
      throw err;
    }
  }
}
module.exports = new Devices();
