const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const User=require('./user');
class Worker extends Model {}
Worker.init({
  name: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  picture:Sequelize.STRING,
  isuser:Sequelize.BOOLEAN,
  birthdate: {type:Sequelize.Date, validate: {notNull: true,isBefore: Sequelize.NOW}},
  contact: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  email: {type:Sequelize.STRING, validate: {isEmail:true}},
  
}, { db, modelName: 'worker' });

Worker.belongsTo(User, {foreignKey: 'user_id'});
module.exports = Worker;
