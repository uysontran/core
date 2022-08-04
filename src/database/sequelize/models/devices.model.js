module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  sequelize.define(
    "Devices",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      upProtocolID: {
        type: DataTypes.INTEGER,
        references: {
          model: "ProtocolConfigs",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      downProtocolID: {
        type: DataTypes.INTEGER,
        references: {
          model: "ProtocolConfigs",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      isProvision: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      token: { type: DataTypes.STRING },
      ModelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
