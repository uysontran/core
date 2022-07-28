module.exports.factory = async (req, res) => {
  const { FlushAll } = require("../database");
  try {
    await FlushAll();
    const fs = require("fs");

    let data = await fs.readFileSync(process.cwd() + "/core.json");
    data = JSON.parse(data);
    if (data.services) {
      for (let service of data.services) {
        const { Services } = require("../database");
        await Services.create(service);
        const { sync } = require("../database");
        await sync();
      }
    }
    if (data.models) {
      for (let model of data.models) {
        await require("../database").Models.create(model);
      }
    }
    if (data.protocols) {
      for (let protocol of data.protocols) {
        const { Protocol } = require("../database");
        await Protocol.create(protocol);
      }
    }
    if (data.devices) {
      for (let device of data.devices) {
        const { Devices } = require("../database");
        await Devices.create(device);
      }
    }
    if (data.tasks) {
      for (let task of data.tasks) {
        const { Tasks } = require("../database");
        const { boot } = require("../tasks");
        await Tasks.create(task);
        await boot();
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
  res.send(200);
};
