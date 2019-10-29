const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
class Unity extends Model {}
Unity.init({
  code: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  description: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  
}, { db, modelName: 'unity' });
module.exports = Unity;
