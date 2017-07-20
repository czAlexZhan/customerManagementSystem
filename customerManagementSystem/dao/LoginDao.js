var sqlPool = require('../service/MysqlService');
var logger = require('../service/LogService');

module.exports = {
    getUserInfoByUserName:function (name) {
        sqlPool.getConnection(function (err, connection) {
        	var sql = "select * from sys_user where name='"+name+"'";
			connection.query(sql,function(err,result){
				if(err){
					logger.info("执行方法 getUserInfoByUserName 出现错误："+err);
				}else{
					console.log(result);
					return result;
				}
			
			});
			connection.release(); 
        });
    }
};