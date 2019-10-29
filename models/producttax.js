const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Tax=require('./tax');
const Product=require('./product');
class ProductTax extends Model {}
ProductTax.init({
  date: {type:Sequelize.Date, validate: {notNull: true}},
  active: {type:Sequelize.BOOLEAN, validate: {notNull: true}},
    
}, { db, modelName: 'product_tax' });

ProductTax.belongsTo(Tax, {foreignKey: 'tax_id'});
ProductTax.belongsTo(Product, {foreignKey: 'profile_id'});
module.exports = ProductTax;
