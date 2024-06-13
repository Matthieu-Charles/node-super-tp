const express = require("express");
const bodyParser = require("body-parser");
const biereRouter = require("./router/biereRouter");
const barRouter = require("./router/barRouter");
const commandeRouter = require("./router/commandeRouter")
const Commande = require("./models/Commande")
const Biere = require("./models/Biere")
const CommandeBiere = require("./models/CommandeBiere")

const db = require ("./config/database")
require("dotenv").config();
const app = express();
const sequelize = require("./config/database");
const Bar = require("./models/Bar");
const Biere = require("./models/Biere");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", biereRouter, barRouter, commandeRouter);


// Association Many-To-Many entre Commande et Biere via CommandeBiere
Commande.belongsToMany(Biere, { through: CommandeBiere, foreignKey: 'commande_id' });
Biere.belongsToMany(Commande, { through: CommandeBiere, foreignKey: 'biere_id' });

// Synchronisation des modèles avec la base de données
db.sync()
  .then(() => {
    console.log('Base de données synchronisée');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });


Bar.hasMany(Biere);
Biere.belongsTo(Bar);

sequelize.sync();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});

module.exports = app;
