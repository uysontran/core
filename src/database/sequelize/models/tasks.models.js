module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  sequelize.define(
    "RecurringTasks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DeviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Devices",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define(
    "RecurringChannels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RecurringTaskId: {
        type: DataTypes.INTEGER,
        references: {
          model: "RecurringTasks",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      ModelChannelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Models",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      timestamps: false,
    }
  );
};
