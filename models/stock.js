const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Product=require('./product');
const Promotion=require('./promotion');
const Provider=require('./provider');
const Sucursal=require('./sucursal');
const Stock = sequelize.define('stock', {
  quantity: {type:Sequelize.INTEGER, allowNull:false,validate: {notNull: true}},
  sellprice: {type:Sequelize.DECIMAL,allowNull:false, field: 'sell_price',validate: {notNull: true}},
  purchaseprice: {type:Sequelize.DECIMAL, allowNull:false,field: 'purchase_price',validate: {notNull: true}},
  promotionid: {
    type: Sequelize.INTEGER,
    field: 'promotion_id',
    references: {
      model: Promotion,
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
  providerid: {
    type: Sequelize.INTEGER,
    field: 'provider_id',
    references: {
      model: Provider,
      key: 'id', 
    }
  },
  sucursalId: {
    type: Sequelize.INTEGER,
    field: 'sucursal_id',
    references: {
      model: Sucursal,
      key: 'id', 
    },allowNull:false,
    validate: {notNull: true}
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
  tableName:'stock'
});

module.exports = Stock;
