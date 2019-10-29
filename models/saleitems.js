const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Sale=require('./sale');
const Stock=require('./stock');
class SaleItems extends Model {}
SaleItems.init({
  price: {type:Sequelize.DECIMAL, validate: {notNull: true}},
  quantity: {type:Sequelize.INTEGER,validate: {notNull: true}},
  discount: {type:Sequelize.DECIMAL,validate: {notNull: true}}    
}, { db, modelName: 'sale_items' });
SaleItems.belongsTo(Sale, {foreignKey: 'sale_id'});
SaleItems.belongsTo(Stock, {foreignKey: 'stock_id'});s
module.exports = SaleItems;
