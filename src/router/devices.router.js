module.exports = function () {
  const Router = require("express").Router();
  Router.get("/count", async (req, res) => {
    const { Devices } = require("../database");
    try {
      const count = await Devices.count();
      res.send({ count });
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.get("/:mode", async (req, res) => {
    const { mode } = req.params;
    try {
      const { Devices } = require("../database");
      const devices = await Devices.getAll(mode);
      res.send(devices);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.delete("/", async (req, res) => {
    try {
      const { id } = req.query;
      const { Devices } = require("../database");
      await Devices.delete(id);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  return Router;
};
