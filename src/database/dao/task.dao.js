class RecurringTasks {
  async create({ DeviceID, interval, startTime, channels }) {
    try {
      const sequelize = require("../sequelize").sequelize;
      const {
        models: { RecurringTasks, ModelChannels, RecurringChannels },
      } = sequelize;
      await sequelize.transaction(async (t) => {
        const task = await RecurringTasks.create(
          { DeviceID, interval, startTime },
          { transaction: t }
        );
        for (const channel of channels) {
          const cn = await ModelChannels.findByPk(channel.id);
          await RecurringChannels.create(
            {
              RecurringTaskId: task.id,
              ModelChannelId: cn.id,
            },
            {
              transaction: t,
            }
          );
        }
        return task;
      });
    } catch (err) {
      console.log(err);
      // throw err;
    }
  }
  async getBootTasks() {
    try {
      const sequelize = require("../sequelize").sequelize;
      const {
        models: {
          RecurringTasks,
          Devices,
          ModelChannels,
          ProtocolConfigs,
          Services,
          APIs,
        },
      } = sequelize;
      const { object } = require("../../utilities");
      const modelChannels = Object.values(
        object.FilterbyKeys(["ModelChannel*"], ModelChannels.associations)
      );
      const ProtocolModels = Object.values(
        object.FilterbyKeys(["ProtocolConfig*"], ProtocolConfigs.associations)
      );
      let IPC = object.FilterbyKeys("!Service", APIs.associations);
      IPC = Object.values(IPC);
      let result = await RecurringTasks.findAll({
        include: [
          {
            model: ModelChannels,
            include: modelChannels,
            through: {
              attributes: [],
            },
          },
          {
            model: Devices,
            where: {
              isProvision: true,
            },
            include: [
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
          },
        ],
      });
      return JSON.parse(
        JSON.stringify(result, (k, v) => (v === null ? undefined : v))
      );
    } catch (err) {
      throw err;
    }
  }
}
module.exports = new RecurringTasks();
