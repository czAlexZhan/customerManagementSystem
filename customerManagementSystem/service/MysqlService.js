/**
 * Created by czAlexzhan on 2017/7/19.
 */
var mysql= require('mysql');
var mysqlOption = require('../conf/mysqlConf').mysql;

var pool = mysql.createPool(mysqlOption);

module.exports = pool;