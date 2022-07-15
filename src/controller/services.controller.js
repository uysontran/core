module.exports = {
  async post(req, res) {
    const { Services } = require("../database");
    try {
      await Services.create(req.body);
      const { sync } = require("../database");
      sync();
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  async get(req, res) {
    const { id } = req.query;
    const { Services } = require("../database");
    try {
      const result = await Services.get(id);
      if (result) {
        return res.send(result.toJSON());
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  async delete(req, res) {
    const { id } = req.query;
    const { Services } = require("../database");
    try {
      await Services.delete(id);
      const { sync } = require("../database");
      sync();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
