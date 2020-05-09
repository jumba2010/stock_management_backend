const keys = require('./keys');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(keys.msqlDbName, keys.msqlUsername, keys.mysqlpassword, {
  dialect: 'mysql',
  logging: false
  });
  sequelize.authenticate().then(() => {
console.log('Connected to database')});
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database Syncronized!`)
  })

  module.exports = sequelize;