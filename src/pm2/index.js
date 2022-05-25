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
