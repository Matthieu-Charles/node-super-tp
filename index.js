const express = require("express");
const bodyParser = require("body-parser");
const biereRouter = require("./router/biereRouter");
const barRouter = require("./router/barRouter");
require("dotenv").config();
const app = express();
const sequelize = require("./config/database");
const Bar = require("./models/Bar");
const Biere = require("./models/Biere");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", biereRouter, barRouter);

Bar.hasMany(Biere);
Biere.belongsTo(Bar);

sequelize.sync();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});

module.exports = app;
