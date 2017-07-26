
// var logger = require('../service/LogService');

module.exports = {
    getUserInfoByUsername:function (userName,callback) {
        global.sqlPool.getConnection(function (err, connection) {
        	if(err){
        		callback(err);
			}else if(connection && 'query' in connection){
                var sql = "select * from sys_user where user_name='"+userName+"'";
                connection.query(sql,function(err,results,fields){
                    if(err){
                        callback(err);
                    }else {
                        callback(null,results);
                    }
                    connection.release();
                });
			}
        });
    },
    registerUserInfo:function (userName, password, callback) {
        global.sqlPool.getConnection(function (err, connection) {
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
                var sql = "insert into sys_user(user_name,user_password,create_time) values(?,?,now())";
                connection.query(sql,[userName,password],function (err, results) {
                   if(err){
                       callback(err);
                   }else{
                       callback(null,results);
                   }
                   connection.release();
                });
            }
        });
    }
};