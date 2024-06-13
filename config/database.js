const sequelize = require("sequelize");

const db = new sequelize({
  dialect: process.env.DB_DRIVER || "sqlite",
  storage: process.env.DB_URL || "db.sqlite",
});

module.exports = db;
