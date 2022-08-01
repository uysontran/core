module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  sequelize.define(
    "Accounts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin"],
      },
    },
    {
      timestamps: false,
    }
  );
};
