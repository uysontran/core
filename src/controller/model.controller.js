const { models, modbusChannels } = require("../model/index");
const debug = require("../utils/debug")("app/modelController");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");
const controller = {
  create: async function (req, res) {
    const { name, channels, manufacture, type } = req.body;

    try {
      await sequelize.transaction(async (t) => {
        await models.create(
          {
            name,
            manufacture,
            type,
            [type]: [...channels],
          },
          {
            include: [
              {
                association: models.modbusChannels,
              },
            ],
            transaction: t,
          }
        );
        res.sendStatus(201);
      });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        if (err.errors[0].message === "name must be unique")
          res.status(400).send(err.errors[0].message);
        else {
          res.status(400).send("Channel Name or Address must be unique");
        }
      } else {
        console.log(err);
        res.sendStatus(400);
      }
    }
  },
  get: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      const result = await models.findOne({
        where: { [Op.or]: { name: name, id: id } },
        include: { model: modbusChannels },
      });
      if (result) {
        return res.send(result);
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
  delete: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      await models.destroy({ where: { [Op.or]: { name: name, id: id } } });
      return res.sendStatus(200);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
  update: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      const { body } = req;
      await models.update(
        { name: body.name, manufacture: body.manufacture, type: body.type },
        { where: { [Op.or]: { name: name, id: id } } }
      );
      for (const channel of body.channels) {
        switch (body.type) {
          case "modbusChannels":
            try {
              await modbusChannels.update(
                { ...channel },
                { where: { id: channel.id } }
              );
            } catch (err) {
              console.log(err);
              throw new Error(err.message);
            }
        }
      }
      res.send(201);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  },
  getModelInfo: async function (req, res) {
    try {
      const result = await models.findAll({
        include: { model: modbusChannels },
      });
      if (result) {
        return res.send(result.map((e) => e.toJSON()));
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
};
module.exports = controller;
