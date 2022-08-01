class Configuration {
  async load() {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { Configuration },
    } = sequelize;
    const defaults = require(__dirname + "/../../../config.json");
    const [config, created] = await Configuration.findOrCreate({
      where: { id: 1 },
      defaults,
    });
    if (created) {
      const fs = require("fs");
      try {
        let data = await fs.readFileSync(__dirname + "/../../../core.json");
        data = JSON.parse(data);
        if (data.services) {
          for (let service of data.services) {
            const Services = require("../dao/services.dao");
            await Services.create(service);
            const { sync } = require("../sequelize");
            await sync();
          }
        }
        if (data.models) {
          for (let model of data.models) {
            await require("../dao/models.dao").create(model);
          }
        }
        if (data.protocols) {
          for (let protocol of data.protocols) {
            const Protocol = require("../dao/protocol.dao");
            await Protocol.create(protocol);
          }
        }
        if (data.devices) {
          for (let device of data.devices) {
            const Devices = require("../dao/devices.dao");
            await Devices.create(device);
          }
        }
        if (data.tasks) {
          for (let task of data.tasks) {
            const Tasks = require("../dao/task.dao");
            await Tasks.create(task);
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    return { isLog: config.logging };
  }
}
module.exports = new Configuration();
