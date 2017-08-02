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
    },
    findCustomerInfoList:function (searchMap, currentPage, pageSize,callback) {
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                console.log(err);
            }else if(connection && 'query' in connection){
                var whereSql = "";
                if(searchMap != null && searchMap.size>0){
                    if(searchMap.get('customer_account') != null){
                        whereSql += " and customer_account like'%"+earchMap.get('customer_account')+"%'";
                    }
                    if(searchMap.get('target_name') != null){
                        whereSql += " and target_name like'%"+searchMap.get('target_name')+"%'";
                    }
                    if(searchMap,get('product_name') != null){
                        whereSql += " and product_name like'%"+earchMap,get('product_name')+"%'";
                    }
                    if(searchMap.get('isDeal') != null && searchMap.get('isDeal')=="1"){
                        whereSql += " and isdeal='是'";
                    }
                    if(searchMap.get('connectTimeStart') != null){
                        whereSql += " and date_format(connect_time,%Y-%m-%d %H:%i:%s) >= '"+earchMap.get('connectTimeStart')+"'";
                    }
                    if(searchMap.get('connectTimeEnd') != null){
                        whereSql += " and date_format(connect_time,%Y-%m-%d %H:%i:%s) <= '"+earchMap.get('connectTimeEnd')+"'";
                    }
                    if(searchMap.get('dealTimeStart') != null){
                        whereSql += " and date_format(deal_time,%Y-%m-%d %H:%i:%s) >= '"+earchMap.get('dealTimeStart')+"'";
                    }
                    if(searchMap.get('dealTimeEnd') != null){
                        whereSql += " and date_format(deal_time,%Y-%m-%d %H:%i:%s) <= '"+earchMap.get('dealTimeEnd')+"'";
                    }
                }

            }
        });
    }
};