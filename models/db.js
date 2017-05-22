var settings = require('../settings.js');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;


// 设置数据库名、数据库地址和数据库端口创建了一个数据库连接实例
module.exports=new Db(settings.db,new Server(settings.host,settings.port),{safe:true});
