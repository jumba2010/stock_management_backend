const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Unit=require('./unity');
class Product extends Model {}
Product.init({
  description:Sequelize.STRING,
  name: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  alertquantity: {type:Sequelize.NUMBER, validate: {notNull: true}},
  availablequantity: {type:Sequelize.NUMBER, validate: {notNull: true}},
  price:{type:Sequelize.DECIMAL, validate: {notNull: true}},
  barcode: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true,isNumeric: true }},  
}, { db, modelName: 'product' });
Product.belongsTo(Unit, {foreignKey: 'unity_id'});
module.exports = Product;
