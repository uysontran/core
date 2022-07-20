module.exports.post = async function (req, res) {
  try {
    await require("../database").Devices.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
module.exports.provision = async function (req, res) {
  try {
    const { id } = req.query;
    const { Devices } = require("../database");
    let {
      name,
      Model: { ModelChannels },
      upProtocol,
    } = await Devices.find(id);

    const { object } = require("../utilities");

    upProtocol = object.flatObject("ProtocolConfig_*", upProtocol);
    upProtocol = {
      ...upProtocol,
      API: upProtocol.Service.APIs.find((e) => e.type === "GET"),
    };
    delete upProtocol.Service;
    upProtocol = object.FilterbyKeys(
      [
        "!ModelChannelID",
        "!ModelID",
        "!MicroserviceID",
        "!ProtocolConfigID",
        "!name",
      ],
      upProtocol
    );
    ModelChannels = ModelChannels.map((channel) => {
      const flatObject = object.flatObject("ModelChannel_*", channel);
      return object.FilterbyKeys(
        ["!ModelChannelID", "!ModelID", "!MicroserviceID", "id"],
        flatObject
      );
    });

    const { API, ...config } = upProtocol;
    try {
      switch (API.protocol) {
        case "HTTP":
          const axios = require("axios");
          const result = await axios[API.REST.method.toLowerCase()](
            `http://${API.REST.url}`,
            {
              data: { name, channels: ModelChannels, ...config },
            }
          );
          await Devices.upDate(id, {
            token: result.data[0].deviceId,
            isProvision: true,
          });
          const { boot } = require("../tasks");
          await boot();
      }
    } catch (err) {
      throw err;
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// module.exports.get = async function (req, res) {
//   try {
//     const { id } = req.query;
//     const result = await require("../dao").Devices.get(id);
//     res.send(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
