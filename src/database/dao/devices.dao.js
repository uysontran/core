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
}
module.exports = new Devices();
