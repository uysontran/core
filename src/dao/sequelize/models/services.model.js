module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  sequelize.define(
    "Services",
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
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["upService", "downService"],
        allowNull: false,
      },
      startScript: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["online", "offline"],
        defaultValue: "offline",
      },
      runOnStartUp: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define(
    "APIs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MicroserviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      protocol: {
        type: DataTypes.ENUM,
        values: ["REST"],
      },
      kind: {
        type: DataTypes.ENUM,
        values: ["IPC", "Command"],
      },
      type: {
        type: DataTypes.ENUM,
        values: ["GET,SET"],
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define("REST", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    API_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  sequelize.define(
    "Metadata",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MicroserviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "1",
      },
      kind: {
        type: DataTypes.ENUM,
        values: ["ModelChannel", "ProtocolConfig"],
        allowNull: false,
        unique: "1",
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "1",
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          "STRING",
          "BOOLEAN",
          "INTERGER",
          "REAL",
          "DECIMAL",
          "DATES",
          "BLOBS",
          "ENUM",
        ],
        allowNull: false,
      },
      values: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("values", JSON.stringify(value));
        },
        validate: {
          isArray(value) {
            if (this.type === "ENUM" && !Array.isArray(JSON.parse(value))) {
              throw new Error("Values of ENUM must be array");
            }
          },
        },
      },
      allowNull: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      defaultValue: {
        type: DataTypes.STRING,
      },
      unique: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define(
    "ProtocolConfigs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MicroserviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        get() {
          return (
            this.getDataValue("name") || `connection ${this.getDataValue("id")}`
          );
        },
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define(
    "ModelChannels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ModelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MicroserviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      readWrite: {
        type: DataTypes.ENUM,
        values: ["R", "W", "RW"],
        defaultValue: "R",
      },
      offset: {
        type: DataTypes.REAL,
        defaultValue: 0,
      },
      scale: {
        type: DataTypes.REAL,
        defaultValue: 1,
      },
      precision: {
        type: DataTypes.REAL,
      },
    },
    {
      timestamps: false,
    }
  );
};
