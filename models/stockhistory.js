const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Product=require('./product');
const StockHistory = sequelize.define('stock_history', {
  quantity: {type:Sequelize.INTEGER, validate: {notNull: true}},
  date: {type:Sequelize.DATE,validate: {notNull: true}}, 
  active:{type:Sequelize.BOOLEAN,defaultValue:true, validate: {notNull: true}},
  createdby:{type:Sequelize.INTEGER,  field: 'created_by',validate: {notNull: true}},
  updatedby:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedby: {type:Sequelize.INTEGER, field: 'activated_by',validate: {notNull: true}},
  updatedate: {type:Sequelize.DATE, field: 'update_date'},
  creationdate: {type:Sequelize.DATE, field: 'creation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
  activationdate: {type:Sequelize.DATE, field: 'activation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
});

StockHistory.belongsTo(Product, {foreignKey: 'product_id'});

module.exports = StockHistory;
