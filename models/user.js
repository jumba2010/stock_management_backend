const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Profile=require('./profile');
class User extends Model {}
const User = sequelize.define('user', {
  username: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  password: {type:Sequelize.STRING, validate: {notNull: true,max:8,min:6,notEmpty: true}},
  profileid: {
    type: Sequelize.INTEGER,
    field: 'profile_id',
    references: {
      model: Profile,
      key: 'id', 
    }
  },
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
    },
    include: [
      { model: Profile, where: { active: true }}
    ]
  },
});

module.exports = User;
