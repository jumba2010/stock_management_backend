const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Product=require('./product');
const Promotion=require('./promotion');
const Provider=require('./provider');
class Stock extends Model {}
Stock.init({
  quantity: {type:Sequelize.INTEGER, validate: {notNull: true}},
  sellprice: {type:Sequelize.DECIMAL, field: 'sell_price',validate: {notNull: true}},
  purchaseprice: {type:Sequelize.DECIMAL, field: 'purchase_price',validate: {notNull: true}},
  createdby: {type:Sequelize.INTEGER, field: 'created_by',validate: {notNull: true}},
  updateddate: {type:Sequelize.DATE, field: 'updated_date'},
  creationdate: {type:Sequelize.DATE, field: 'creation_date',validate: {notNull: true}},
  active: {type:Sequelize.BOOLEAN, validate: {notNull: true}},
    
}, { db, modelName: 'stock' });

Stock.belongsTo(Promotion, {foreignKey: 'promotion_id'});
Stock.belongsTo(Product, {foreignKey: 'product_id'});
Stock.belongsTo(Provider, {foreignKey: 'provider_id'});
module.exports = Stock;
