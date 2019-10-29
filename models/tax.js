const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
class Tax extends Model {}
Tax.init({
  type: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  description: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  start_date: {type:Sequelize.Date, validate: { isAfter: Sequelize.NOW}},
  active: {type:Sequelize.BOOLEAN, validate: {notNull: true}},
  value: {type:Sequelize.DECIMAL, validate: {notNull: true, isDecimal: true }}   
}, { db, modelName: 'tax' });
module.exports = Tax;
