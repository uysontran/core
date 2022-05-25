const { DataTypes } = require("sequelize");
module.exports = async function (sequelize) {
  sequelize.define(
    "RepeatableTasks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DeviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["ReadDeviceData"],
        allowNull: false,
      },
      scheduleType: {
        type: DataTypes.ENUM,
        values: ["CRON", "Periodic"],
      },
      interval: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["running", "stopping"],
        defaultValue: "running",
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define(
    "ReadDeviceData",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TaskID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ChannelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
