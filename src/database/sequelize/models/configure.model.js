module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  return sequelize.define(
    "Configuration",
    {
      id: {
        type: DataTypes.ENUM,
        values: [1],
        primaryKey: true,
        unique: true,
      },
      logging: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
