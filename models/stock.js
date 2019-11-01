const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Product=require('./product');
const Promotion=require('./promotion');
const Provider=require('./provider');
const Stock = sequelize.define('stock', {
  quantity: {type:Sequelize.INTEGER, validate: {notNull: true}},
  sellprice: {type:Sequelize.DECIMAL, field: 'sell_price',validate: {notNull: true}},
  purchaseprice: {type:Sequelize.DECIMAL, field: 'purchase_price',validate: {notNull: true}},
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
  active:{type:Sequelize.BOOLEAN,defaultValue:true, validate: {notNull: true}},
  createdby:{type:Sequelize.INTEGER,  field: 'created_by',validate: {notNull: true}},
  updatedby:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedby: {type:Sequelize.INTEGER, field: 'activated_by',validate: {notNull: true}},
  updatedate: {type:Sequelize.DATE, field: 'update_date'},
  creationdate: {type:Sequelize.DATE, field: 'creation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
  activationdate: {type:Sequelize.DATE, field: 'activation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
    
},{
  defaultScope: {
    where: {
      active: true
    },
    include: [
      { model: Product, where: { active: true }},
      { model: Provider, where: { active: true }}
    ]
  },  
});

module.exports = Stock;
