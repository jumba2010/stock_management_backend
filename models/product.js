const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Unit=require('./unity');
const Product = sequelize.define('product', {
  description:Sequelize.STRING,
  name: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  alertquantity: {type:Sequelize.NUMBER, validate: {notNull: true}},
  availablequantity: {type:Sequelize.NUMBER, validate: {notNull: true}},
  price:{type:Sequelize.DECIMAL, validate: {notNull: true}},
   barcode: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true,isNumeric: true }},  
   active:{type:Sequelize.BOOLEAN,defaultValue:true, validate: {notNull: true}},
   createdby:{type:Sequelize.INTEGER,  field: 'created_by',validate: {notNull: true}},
   updatedby:{type:Sequelize.INTEGER,  field: 'updated_by'},
   activatedby: {type:Sequelize.INTEGER, field: 'activated_by',validate: {notNull: true}},
   updatedate: {type:Sequelize.DATE, field: 'update_date'},
   creationdate: {type:Sequelize.DATE, field: 'creation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
   activationdate: {type:Sequelize.DATE, field: 'activation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
});
Product.belongsTo(Unit, {foreignKey: 'unity_id'});
module.exports = Product;
