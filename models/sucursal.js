const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Sucursal = sequelize.define('Sucursal', {
  code: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true,notEmpty: true}},
  description: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true,notEmpty: true}},
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
  tableName:'sucursal'
});
module.exports = Sucursal;
