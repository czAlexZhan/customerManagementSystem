var sqlPool = require('../service/MysqlService');
// var logger = require('../service/LogService');

module.exports = {
    getUserInfoByUsername:function (userName,callback) {
        sqlPool.getConnection(function (err, connection) {
        	if(err){
        		console.log(err);
			}else if(connection && 'query' in connection){
                var sql = "select * from sys_org_user where name='"+userName+"'";
                connection.query(sql,function(err,results,fields){
                    if(err){
                    	console.log(err)
						callback(err);
                        // logger.info("执行方法 getUserInfoByUserName 出现错误："+err);
                    }else{
                        console.log(results);
                        callback(null,results);
                        connection.release();
                    }
                });
			}
        });
    }
};