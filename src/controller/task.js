module.exports = {
  async post(req, res) {
    const { sequelize } = require("../sequelize");
    const { RepeatableTasks, ReadDeviceData } = sequelize.models;
    // const
    try {
      await sequelize.transaction(async (t) => {
        const result = await RepeatableTasks.create(req.body, {
          transaction: t,
          include: [ReadDeviceData],
        });
        return result;
      });
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
  async get(req, res) {},
};
