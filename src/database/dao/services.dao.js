class Services {
  async create(service) {
    try {
      const sequelize = require("../sequelize").sequelize;
      const {
        models: { Services, APIs, Metadata, RESTs },
      } = sequelize;
      await sequelize.transaction(async (t) => {
        const result = await Services.create(service, {
          include: [{ model: APIs, include: [RESTs] }, Metadata],
          transaction: t,
        });
        return result;
      });
    } catch (err) {
      throw err;
    }
  }
  async get(id) {
    const {
      models: { Services, APIs, Metadata },
    } = require("../sequelize").sequelize;
    try {
      const result = await Services.findByPk(id, {
        include: [APIs, Metadata],
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async delete(id) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { Services },
    } = sequelize;
    try {
      await sequelize.transaction(async (t) => {
        return await Services.destroy({ where: { id }, transaction: t });
      });
    } catch (err) {
      throw err;
    }
  }
  async getIPC(params) {
    const sequelize = require("../sequelize").sequelize;
    const {
      models: { APIs },
    } = sequelize;
    let IPC = object.FilterbyKeys("!Service", APIs.associations);
    IPC = Object.values(IPC);
    const result = await APIs.findOne({
      where: params,
      include: IPC,
    });
    return result.toJSON();
  }
}
module.exports = new Services();
