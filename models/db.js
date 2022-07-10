const Sequelize = require('sequelize')
 const sequelize = new Sequelize('sydnut8a2tojn9lr','qfwpcsgjhbk9a9fs','vl5htnqpala09o0c',{
  host: 'cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port:'3306',
  dialect: 'mysql'

 })
 
 module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
 }
