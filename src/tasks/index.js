async function readChannels(ModelChannels, Device) {
  const { object } = require("../utilities");
  const channels = ModelChannels.map((channel) => {
    const flatObject = object.flatObject("ModelChannel_*", channel);
    return object.FilterbyKeys(
      ["!id", "!ModelChannelID", "!ModelID", "!MicroserviceID"],
      flatObject
    );
  });
  const { id, ProtocolConfigID, MicroserviceID, ...downProtocol } =
    object.flatObject("ProtocolConfig_*", Device.downProtocol);
  const requestBody = { ...downProtocol, channels };

  const { Services } = require("../database");
  const IPC = await Services.getIPC({
    MicroserviceID,
    type: "GET",
    kind: "IPC",
  });
  switch (IPC.protocol) {
    case "HTTP":
      const axios = require("axios");
      const config = IPC.REST;
      try {
        return (await axios.get(`http://${config.url}`, { data: requestBody }))
          .data;
      } catch (err) {
        console.log(err);
      }
      break;
  }
}

async function telemetryTasks({ ModelChannels, Device }) {
  const data = await readChannels(ModelChannels, Device);
  console.log(data);
}
module.exports.boot = async function () {
  const { Tasks } = require("../database");
  const scheudler = require("./scheduler");
  const task = await Tasks.getBootTasks();
  task.forEach((e) => {
    scheudler.addTask(telemetryTasks, e.interval, e, {
      key: e.id,
      startTime: new Date(e.startTime).getTime(),
    });
  });
};
