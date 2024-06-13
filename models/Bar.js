const sequelize = require("sequelize");
const db = require("../config/database");

const Bar = db.define(
  "Bar",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [3, 255],
      },
    },
    adresse: {
      type: sequelize.STRING,
      allowNull: true,
      validate: {
        len: [3, 255],
      },
    },
    ville: {
      type: sequelize.STRING,
      allowNull: true,
      validate: {
        len: [1, 50],
      },
    },
    tel: {
      type: sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    description: {
      type: sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Bar",
    timestamps: false,
  }
);

module.exports = Bar;
