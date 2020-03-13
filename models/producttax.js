const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Tax=require('./tax');
const Product=require('./product');
const ProductTax = sequelize.define('product_tax', {
  taxId: {
    type: Sequelize.INTEGER,
    field: 'tax_id',
    references: {
      model: Tax,
      key: 'id', 
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    field: 'product_id',
    references: {
      model: Product,
      key: 'id', 
    }
  },
  syncStatus: {type:Sequelize.INTEGER,allowNull:false,validate: {notNull: true},defaultValue:0},
  active:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false, validate: {notNull: true}},
  createdBy:{type:Sequelize.INTEGER,  field: 'created_by',allowNull:false,validate: {notNull: true}},
  updatedBy:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedBy: {type:Sequelize.INTEGER, field: 'activated_by',allowNull:false,validate: {notNull: true}},
  activationDate: {type:Sequelize.DATE, field: 'activation_date',allowNull:false,defaultValue: Sequelize.NOW,validate: {notNull: true}},
    
},{
  defaultScope: {
    where: {
      active: true
    }
  },
  tableName:'product_tax'
});

module.exports = ProductTax;
