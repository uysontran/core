const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const models = sequelize.define(
  "models",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    manufacture: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      modelId: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
const modbusChannels = sequelize.define(
  "modbusChannels",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
    modelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "compositeIndex",
    },
    fc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precision: {
      type: DataTypes.INTEGER,
    },
    parse: {
      type: DataTypes.ENUM,
      values: [
        "BigInt64BE",
        "BigInt64LE",
        "BigUInt64BE",
        "BigUInt64LE",
        "DoubleBE",
        "DoubleLE",
        "FloatBE",
        "FloatLE",
        "Int16BE",
        "Int16LE",
        "Int32BE",
        "Int32LE",
        "IntBE",
        "IntLE",
        "UInt16BE",
        "UInt16LE",
        "UInt32BE",
        "UInt32LE",
        "UIntBE",
        "UIntLE",
      ],
      allowNull: false,
      defaultValue: "Int16BE",
    },
    parser: {
      type: DataTypes.STRING,
    },
    scale: {
      type: DataTypes.DOUBLE,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = {
  models,
  modbusChannels,
};
