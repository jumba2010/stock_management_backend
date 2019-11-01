const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Sale=require('./sale');
const Stock=require('./stock');
const SaleItems = sequelize.define('sale_items', {
  price: {type:Sequelize.DECIMAL, validate: {notNull: true}},
  quantity: {type:Sequelize.INTEGER,validate: {notNull: true}},
  discount: {type:Sequelize.DECIMAL,validate: {notNull: true}},
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
      { model: Stock, where: { active: true }}
    ]
  },
});

module.exports = SaleItems;
