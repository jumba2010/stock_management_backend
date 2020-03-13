const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Unit=require('./unity');
const Sucursal=require('./sucursal');
const Product = sequelize.define('product', {
  description:Sequelize.STRING,
  name: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true,notEmpty: true}},
  alertquantity: {type:Sequelize.INTEGER,allowNull:false, validate: {notNull: true}},
  availablequantity: {type:Sequelize.INTEGER,allowNull:false, validate: {notNull: true}},
  price:{type:Sequelize.DECIMAL, allowNull:false,validate: {notNull: true}},
   barcode: {type:Sequelize.STRING, allowNull:false,validate: {notNull: true,notEmpty: true,not: ["[a-z]",'i'] }},  
   unityId: {
    type: Sequelize.INTEGER,
    field: 'unity_id',
    references: {
      model: Unit,
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
},
{
  defaultScope: {
    where: {
      active: true
    }
  },

  tableName:'product'
}
);

module.exports = Product;
