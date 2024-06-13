const sequelize = require("sequelize")
const db = require("../config/database")
const Commande = require ("./Commande")
const Biere = require ("./Biere")

const CommandeBiere = db.define('CommandeBiere', {
    commande_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Commande,
        key: 'id'
      }
    },
    biere_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Biere,
        key: 'id'
      }
    }
  }, {
    tableName: 'CommandeBiere',
    timestamps: false
  });
  
  module.exports = CommandeBiere;