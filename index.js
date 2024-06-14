const express = require("express");
const bodyParser = require("body-parser");
const biereRouter = require("./router/biereRouter");
const barRouter = require("./router/barRouter");
const commandeRouter = require("./router/commandeRouter");
const Commande = require("./models/Commande");
const Biere = require("./models/Biere");
const CommandeBiere = require("./models/CommandeBiere");

require("dotenv").config();
const app = express();
const sequelize = require("./config/database");
const Bar = require("./models/Bar");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", biereRouter, barRouter, commandeRouter);

// Association Many-To-Many entre Commande et Biere via CommandeBiere
Commande.belongsToMany(Biere, {
  through: CommandeBiere,
  foreignKey: "commande_id",
});

Biere.belongsToMany(Commande, {
  through: CommandeBiere,
  foreignKey: "biere_id",
  onDelete: "CASCADE",
  hooks: true,
});

Bar.hasMany(Commande, {
  onDelete: "CASCADE",
  hooks: true,
  onDelete: "CASCADE",
  hooks: true,
});
Commande.belongsTo(Bar);

Bar.hasMany(Biere, {
  onDelete: "CASCADE",
  hooks: true,
});
Biere.belongsTo(Bar);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});

module.exports = app;
