module.exports = {
    /**
     * 插入记录
      */
    insertCustomerInfo:function (list, callback) {
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
                let sql = "insert into sys_customer() values()";
                if(list != null || list != undefined){
                    connection.query(sql,list,function (err, results, fields) {
                       if(err){
                           callback(err);
                       }else {
                           callback(null,results);
                       }
                       connection.release();
                    });
                }
            }
        });
    }
};