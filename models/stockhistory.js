const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Product=require('./product');
class StockHistory extends Model {}
StockHistory.init({
  quantity: {type:Sequelize.INTEGER, validate: {notNull: true}},
  date: {type:Sequelize.DATE,validate: {notNull: true}}, 
}, { db, modelName: 'stock_history' });

StockHistory.belongsTo(Product, {foreignKey: 'product_id'});

module.exports = StockHistory;
