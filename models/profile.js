const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
class Profile extends Model {}
Profile.init({
  code: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  description: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  
}, { db, modelName: 'profile' });
module.exports = Profile;
