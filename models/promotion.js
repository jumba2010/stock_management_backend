const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
class Promotion extends Model {}
Promotion.init({
  description: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  percentage: {type:Sequelize.DECIMAL, validate: {notNull: true}} 
  
}, { db, modelName: 'promotion' });
module.exports = Promotion;
