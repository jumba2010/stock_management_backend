const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Promotion = sequelize.define('promotion', {
  description: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  percentage: {type:Sequelize.DECIMAL, validate: {notNull: true}},
  active:{type:Sequelize.BOOLEAN,defaultValue:true, validate: {notNull: true}},
  createdby:{type:Sequelize.INTEGER,  field: 'created_by',validate: {notNull: true}},
  updatedby:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedby: {type:Sequelize.INTEGER, field: 'activated_by',validate: {notNull: true}},
  updatedate: {type:Sequelize.DATE, field: 'update_date'},
  creationdate: {type:Sequelize.DATE, field: 'creation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
  activationdate: {type:Sequelize.DATE, field: 'activation_date',defaultValue: Sequelize.NOW,validate: {notNull: true}},
  
});
module.exports = Promotion;
