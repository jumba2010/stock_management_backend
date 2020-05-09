const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Sale=require('./sale');
const Stock=require('./stock');
const Product=require('./product');
const SaleItems = sequelize.define('sale_items', {
  price: {type:Sequelize.DECIMAL(8,2),allowNull:false, validate: {notNull: true}},
  quantity: {type:Sequelize.INTEGER,allowNull:false,validate: {notNull: true}},
  productname: {field: 'product_name',type:Sequelize.STRING,allowNull:false, validate: {notNull: true,notEmpty: true}},
  discount: {type:Sequelize.DECIMAL(6,2),allowNull:false,validate: {notNull: true},defaultValue:0.0},
  saleid: {
    type: Sequelize.INTEGER,
    field: 'sale_id',
    references: {
      model: Sale,
      key: 'id', 
    }
  },
  productid: {
    type: Sequelize.INTEGER,
    field: 'product_id',
    references: {
      model: Product,
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
