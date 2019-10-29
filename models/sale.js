const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Worker=require('./worker');
class Sale extends Model {}
Sale.init({
  date: {type:Sequelize.DATE, validate: {notNull: true}},
  total: {type:Sequelize.DECIMAL,validate: {notNull: true}},
  status: {type:Sequelize.STRING,validate: {notNull: true}},
  items: {type:Sequelize.INTEGER,validate: {notNull: true}},
  createdby: {type:Sequelize.INTEGER, field: 'created_by',validate: {notNull: true}},
  updatedby: {type:Sequelize.INTEGER, field: 'updated_by',validate: {notNull: true}},
  activatedby: {type:Sequelize.INTEGER, field: 'activated_by',validate: {notNull: true}},
  updateddate: {type:Sequelize.DATE, field: 'updated_date'},
  creationdate: {type:Sequelize.DATE, field: 'creation_date',validate: {notNull: true}},
  activationdate: {type:Sequelize.DATE, field: 'activation_date',validate: {notNull: true}},
  active: {type:Sequelize.BOOLEAN, validate: {notNull: true}},
    
}, { db, modelName: 'sale' });


Sale.belongsTo(Worker, {foreignKey: 'worker_id'});
module.exports = Sale;
