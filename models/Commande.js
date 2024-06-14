const sequelize = require("sequelize")
const db = require("../config/database")

const Commande = db.define('Commande', {
  id : { type : sequelize.INTEGER, 
	primaryKey : true, 
	autoIncrement : true},
  name : {
	type : sequelize.STRING,
	allowNull : false,
	validate : {
	  notNull : true,
	  len: [1, 255],
	},
  },
  prix: {
    type: sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  date: {
    type: sequelize.DATEONLY,
    allowNull: false
  },
  status: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['en cours', 'terminée']]
    }
  }
}, {
  tableName: 'Commande',
  timestamps: false
});


module.exports = Commande