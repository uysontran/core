module.exports = async function (sequelize) {
  const { DataTypes } = require("sequelize");
  sequelize.define(
    "Microservices",
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
    "RESTAttributes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MicroserviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "2",
      },
      type: {
        type: DataTypes.ENUM,
        values: ["set", "get"],
        allowNull: false,
        unique: "2",
      },
      method: {
        type: DataTypes.ENUM,
        values: ["get", "post", "delete", "put"],
        allowNull: false,
        unique: "1",
      },
      host: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "1",
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "1",
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "1",
      },
    },
    {
      timestamps: false,
    }
  );
  sequelize.define(
    "ServiceMetaDatas",
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
  sequelize.define("ProtocolConfig", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MicroserviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  sequelize.define("ModelChannel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MicroserviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
