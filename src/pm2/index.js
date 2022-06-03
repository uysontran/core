module.exports.startUp = async function () {
  const { sequelize } = require("../sequelize");
  const { Microservices } = sequelize.models;
  const services = await Microservices.findAll({
    where: {
      status: "online",
      runOnStartUp: true,
    },
  });
  new Promise(async function (resolve, reject) {
    for (const service of services) {
      const pm2 = require("pm2");
      pm2.connect(true, function (err) {
        if (err) {
          console.log(err);
        } else {
          pm2.start(
            {
              script: service.startScript,
              name: service.name,
              cwd: service.path,
            },
            async (err, apps) => {
              if (err) {
                console.log(err);
                service.startus = "offline";
                await service.save();
              } else {
                service.startus = "online";
                await service.save();
              }
            }
          );
        }
      });
    }
  });
};
module.exports.startMicroservice = async function (id) {
  const { sequelize } = require("../sequelize");
  const { Microservices } = sequelize.models;
  const service = await Microservices.findOne({
    where: {
      id: id,
    },
  });
  const pm2 = require("pm2");
  pm2.connect(true, function (err) {
    if (err) {
      console.log(err);
      return true;
    } else {
      pm2.start(
        {
          script: service.startScript,
          name: service.name,
          cwd: service.path,
        },
        async (err, apps) => {
          if (err) {
            console.log(err);
            service.startus = "offline";
            await service.save();
            return false;
          } else {
            service.startus = "online";
            await service.save();
            return true;
          }
        }
      );
    }
  });
};
module.exports.stopMicroservice = async function (id) {
  const { sequelize } = require("../sequelize");
  const { Microservices } = sequelize.models;
  const service = await Microservices.findOne({
    where: {
      id: id,
    },
  });
  const pm2 = require("pm2");
  pm2.connect(true, function (err) {
    if (err) {
      console.log(err);
      return false;
    } else {
      pm2.delete(service.name, (err) => {
        if (err) {
          console.log(err);
          return false;
        }
        return true;
      });
    }
  });
};
