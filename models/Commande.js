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
//   bars_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Bar', 
//       key: 'id'
//     }
//   },
  date: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW 
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