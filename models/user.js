const Sequelize = require('sequelize');
const db = require('../config/dbconfig');
const Profile=require('./profile');
class User extends Model {}
User.init({
  username: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  password: {type:Sequelize.STRING, validate: {notNull: true,max:8,min:6,notEmpty: true}},
  active: {type:Sequelize.BOOLEAN, validate: {notNull: true}},
  
}, { db, modelName: 'project' });
User.belongsTo(Profile, {foreignKey: 'profile_id'});
module.exports = User;
