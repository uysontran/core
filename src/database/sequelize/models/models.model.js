module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  sequelize.define(
    "Models",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MicroserviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Services",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      manufacture: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
