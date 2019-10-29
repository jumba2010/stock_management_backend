const keys = require('keys');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(keys.msqlDbName, keys.msqlUsername, keys.mysqlpassword, {
    dialect: 'mysql'
  });
  sequelize.authenticate().then(() => {
console.log('Connected to mysql')});
  module.exports = sequelize;