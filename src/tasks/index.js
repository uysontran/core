async function readChannels({ downProtocol, name, channels }) {
  const { API, ...config } = downProtocol;
  const { object } = require("../utilities");
  try {
    switch (API.protocol) {
      case "HTTP":
        const axios = require("axios");
        const { data } = await axios[API.REST.method.toLowerCase()](
          `http://${API.REST.url}`,
          {
            data: { name, channels, ...config },
          }
        );
        //handle data
        data.channels.forEach((e, i) => {
          let { offset, scale, value, precision } = data.channels[i];
          data.channels[i] = object.FilterbyKeys(
            ["!id", "!readWrite", "!offset", "!scale", "!precision"],
            e
          );
          value = value * scale + offset;
          if (precision) {
            value = value.toFixed(precision);
          }
          data.channels[i].value = value;
        });
        return data;
    }
  } catch (err) {
    throw err;
  }
}
async function uploadData({ data, upProtocol, token }) {
  const { API, ...config } = upProtocol;
  try {
    switch (API.protocol) {
      case "HTTP":
        const axios = require("axios");
        const result = await axios[API.REST.method.toLowerCase()](
          `http://${API.REST.url}`,
          {
            data: { data, config, token },
          }
        );
    }
  } catch (err) {
    throw err;
  }
}
function filterTask({ ModelChannels, Device }) {
  const { object } = require("../utilities");
  const channels = ModelChannels.map((channel) => {
    const flatObject = object.flatObject("ModelChannel_*", channel);
    return object.FilterbyKeys(
      ["!ModelChannelID", "!ModelID", "!MicroserviceID"],
      flatObject
    );
  });
  let downProtocol = object.flatObject("ProtocolConfig_*", Device.downProtocol);

  downProtocol = {
    ...downProtocol,
    API: downProtocol.Service.APIs.find((e) => e.type === "GET"),
  };
  delete downProtocol.Service;
  downProtocol = object.FilterbyKeys(
    [
      "!ModelChannelID",
      "!ModelID",
      "!MicroserviceID",
      "!ProtocolConfigID",
      "!name",
    ],
    downProtocol
  );
  let upProtocol = object.flatObject("ProtocolConfig_*", Device.upProtocol);
  upProtocol = {
    ...upProtocol,
    API: upProtocol.Service.APIs.find((e) => e.type === "SET"),
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
  return {
    name: Device.name,
    channels,
    upProtocol,
    downProtocol,
    token: Device.token,
  };
}

async function telemetryTasks(params) {
  try {
    const data = await readChannels(params);
    data.channels.push({
      name: "timestamp",
      value: new Date(new Date().setMilliseconds(0)).toISOString(),
    });
    await uploadData({ data, ...params });
  } catch (err) {
    console.log(err.message);
  }
}
module.exports.boot = async function () {
  const { Tasks } = require("../database");
  const scheudler = require("./scheduler");
  scheudler.deleteAllTask();
  const task = await Tasks.getBootTasks();
  task.forEach(({ interval, startTime, ModelChannels, Device, id: key }) => {
    const params = filterTask({ ModelChannels, Device });
    scheudler.addTask(telemetryTasks, interval, params, {
      key,
      startTime,
    });
  });
};
