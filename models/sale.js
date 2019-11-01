const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Sale = sequelize.define('sale', {
  date: {type:Sequelize.DATE, validate: {notNull: true}},
  total: {type:Sequelize.DECIMAL,validate: {notNull: true}},
  status: {type:Sequelize.STRING,validate: {notNull: true}},
  items: {type:Sequelize.INTEGER,validate: {notNull: true}},
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
    }
  },
});

module.exports = Sale;
