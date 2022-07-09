module.exports = {
  async post(req, res) {
    const { Services } = require("../dao");
    try {
      await Services.create(req.body);
      const { sync } = require("../dao");
      sync();
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  async get(req, res) {
    const { id } = req.query;
    const { Services } = require("../dao");
    try {
      const result = await Services.get(id);
      res.send(result.toJSON());
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  async delete(req, res) {
    const { id } = req.query;
    const { Services } = require("../dao");
    try {
      await Services.delete(id);
      const { sync } = require("../dao");
      sync();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
