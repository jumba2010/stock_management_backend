const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const User=require('./user');
const Worker = sequelize.define('worker', {
  name: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  picture:Sequelize.STRING,
  isuser:Sequelize.BOOLEAN,
  address:Sequelize.STRING,
  category:Sequelize.STRING,
  birthdate: {type:Sequelize.Date, validate: {notNull: true,isBefore: Sequelize.NOW}},
  contact: {type:Sequelize.STRING, validate: {notNull: true,notEmpty: true}},
  email: {type:Sequelize.STRING, validate: {isEmail:true}},
  userid: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    references: {
      model: User,
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
      { model: User, where: { active: true }}
    ]
  },
});

module.exports = Worker;
