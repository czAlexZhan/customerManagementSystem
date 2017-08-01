module.exports = {
    /**
     * 插入记录
      */
    insertCustomerInfo:function (list, callback) {
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
                var sql = "INSERT INTO sys_customerinfo(customer_account,target_name,deal_time,connect_time,product_name,product_price,isdeal,deal_times,store_name,isrepeat,repeat_name,status)" +
                    " VALUES ?";
                if(list != null || list != undefined){
                    connection.query("set names utf8;");
                    connection.query(sql,[list],function (err, results, fields) {
                       if(err){
                           connection.rollback(function () {
                               callback(err);
                           });
                       }
                       connection.commit(function (err) {
                          if(err){
                              connection.rollback(function () {
                                  callback(err);
                              });
                          }
                          callback(null,results);
                       });
                       connection.release();
                    });
                }
            }
        });
    }
};