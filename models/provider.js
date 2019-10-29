const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
class Provider extends Model {}
Provider.init({
  name: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  contact: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  email: {type:Sequelize.STRING},
  picture: {type:Sequelize.STRING}
  
}, { db, modelName: 'provider' });
module.exports = Provider;
