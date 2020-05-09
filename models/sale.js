const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Sucursal=require('./sucursal');
const Sale = sequelize.define('sale', {
  date: {type:Sequelize.DATEONLY, field: 'date',allowNull:false,defaultValue: Sequelize.NOW,validate: {notNull: true}},
  total: {type:Sequelize.DECIMAL(8,2),allowNull:false,validate: {notNull: true}},
  status: {type:Sequelize.STRING,allowNull:false,validate: {notNull: true},defaultValue:'DONE'},
  items: {type:Sequelize.INTEGER,allowNull:false,validate: {notNull: true}},
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
  tableName:'sale'
});

module.exports = Sale;
