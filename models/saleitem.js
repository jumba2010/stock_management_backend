const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Sale=require('./sale');
const Stock=require('./stock');
const SaleItems = sequelize.define('sale_items', {
  price: {type:Sequelize.DECIMAL,allowNull:false, validate: {notNull: true}},
  quantity: {type:Sequelize.INTEGER,allowNull:false,validate: {notNull: true}},
  discount: {type:Sequelize.DECIMAL,allowNull:false,validate: {notNull: true}},
  saleid: {
    type: Sequelize.INTEGER,
    field: 'sale_id',
    references: {
      model: Sale,
      key: 'id', 
    }
  },
  stockid: {
    type: Sequelize.INTEGER,
    field: 'stock_id',
    references: {
      model: Stock,
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
    },
  },
  tableName:'sale_item'
});

module.exports = SaleItems;
