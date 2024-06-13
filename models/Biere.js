const sequelize = require("sequelize")
const db = require("../config/database")

const Biere = db.define('Biere', {
  id : { type : sequelize.INTEGER, 
	primaryKey : true, 
	autoIncrement : true},
  name : {
	type : sequelize.STRING,
	allowNull : false,
	validate : {
	  notNull : true,
	  len: [3, 255],
	},
  },
  description : {
	type : sequelize.TEXT,
	allowNull : false,
	validate : {
	  notNull : true,
	  len: [3, 255],
	}
  },
  degree: {
	type: sequelize.FLOAT,
	allowNull: false
},
  prix: {
	type: sequelize.FLOAT,
	allowNull: false,
	validate: {
		min: 0
	}
},
}, 
{
tableName: 'Biere',
timestamps: false
}
);


module.exports = Biere