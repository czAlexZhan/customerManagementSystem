module.exports = {
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
    findCustomerInfoList:function (searchMap, currentPage, pageSize,isPaging,callback) {
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                console.log(err);
                callback(err);
            }else if(connection && 'query' in connection){
                var whereSql = "";
                if(searchMap != null && searchMap.size>0){
                    if(searchMap.get('customer_account') != null && searchMap.get('customer_account') != ""){
                        whereSql += " and customer_account like'%"+searchMap.get('customer_account')+"%'";
                    }
                    if(searchMap.get('target_name') != null && searchMap.get('target_name') != ""){
                        whereSql += " and target_name like'%"+searchMap.get('target_name')+"%'";
                    }
                    if(searchMap.get('product_name') != null && searchMap.get('product_name') != ""){
                        whereSql += " and product_name like'%"+searchMap.get('product_name')+"%'";
                    }
                    if(searchMap.get('isDeal') != null && searchMap.get('isDeal')=="1"){
                        whereSql += " and isdeal='是'";
                    }
                    if(searchMap.get('notDeal') != null && searchMap.get('notDeal')=="1"){
                        whereSql += " and isdeal='否'";
                    }
                    if(searchMap.get('connectTimeStart') != null && searchMap.get('connectTimeStart') != ""){
                        whereSql += " and date_format(connect_time,'%Y-%m-%d %H:%i:%s') >= '"+searchMap.get('connectTimeStart')+"'";
                    }
                    if(searchMap.get('connectTimeEnd') != null && searchMap.get('connectTimeEnd') != ""){
                        whereSql += " and date_format(connect_time,'%Y-%m-%d %H:%i:%s') <= '"+searchMap.get('connectTimeEnd')+"'";
                    }
                    if(searchMap.get('dealTimeStart') != null && searchMap.get('dealTimeStart') != ""){
                        whereSql += " and date_format(deal_time,'%Y-%m-%d %H:%i:%s') >= '"+searchMap.get('dealTimeStart')+"'";
                    }
                    if(searchMap.get('dealTimeEnd') != null && searchMap.get('dealTimeEnd') != ""){
                        whereSql += " and date_format(deal_time,'%Y-%m-%d %H:%i:%s') <= '"+searchMap.get('dealTimeEnd')+"'";
                    }
                }
                var maxnum = 0;
                var minnum = 0;
                if(isPaging){
                    minnum = (currentPage - 1) * pageSize;
                    if(minnum != 0){
                        minnum = minnum + 1;
                    }else {
                        minnum = minnum;
                    }
                    maxnum = currentPage * pageSize;
                }
                var sql = "select ID,CUSTOMER_ACCOUNT,TARGET_NAME,DATE_FORMAT(DEAL_TIME,'%Y-%m-%d %H:%i:%s') DEAL_TIME,DATE_FORMAT(CONNECT_TIME,'%Y-%m-%d %H:%i:%s') CONNECT_TIME ,PRODUCT_NAME,PRODUCT_PRICE," +
                    "ISDEAL,DEAL_TIMES,STORE_NAME,ISREPEAT,REPEAT_NAME from sys_customerinfo where 1=1"+whereSql+" and status='A' order by CONNECT_TIME limit "+minnum+","+maxnum;
                connection.query(sql,function(err,results){
                    if(err){
                        console.log(err);
                        callback(err);
                    }else{
                        callback(null,results);
                    }
                    connection.release();
                });

            }
        });
    },
    findCustomerInfoCount:function(searchMap,callback){
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                console.log(err);
                callback(err);
            }else if(connection && 'query' in connection){
                var whereSql = "";
                if(searchMap != null && searchMap.size>0){
                    if(searchMap.get('customer_account') != null && searchMap.get('customer_account') != ""){
                        whereSql += " and customer_account like'%"+searchMap.get('customer_account')+"%'";
                    }
                    if(searchMap.get('target_name') != null && searchMap.get('target_name') != ""){
                        whereSql += " and target_name like'%"+searchMap.get('target_name')+"%'";
                    }
                    if(searchMap.get('product_name') != null && searchMap.get('product_name') != ""){
                        whereSql += " and product_name like'%"+searchMap.get('product_name')+"%'";
                    }
                    if(searchMap.get('isDeal') != null && searchMap.get('isDeal')=="1"){
                        whereSql += " and isdeal='是'";
                    }
                    if(searchMap.get('connectTimeStart') != null && searchMap.get('connectTimeStart') != ""){
                        whereSql += " and date_format(connect_time,'%Y-%m-%d %H:%i:%s') >= '"+searchMap.get('connectTimeStart')+"'";
                    }
                    if(searchMap.get('connectTimeEnd') != null && searchMap.get('connectTimeEnd') != ""){
                        whereSql += " and date_format(connect_time,'%Y-%m-%d %H:%i:%s') <= '"+searchMap.get('connectTimeEnd')+"'";
                    }
                    if(searchMap.get('dealTimeStart') != null && searchMap.get('dealTimeStart') != ""){
                        whereSql += " and date_format(deal_time,'%Y-%m-%d %H:%i:%s') >= '"+searchMap.get('dealTimeStart')+"'";
                    }
                    if(searchMap.get('dealTimeEnd') != null && searchMap.get('dealTimeEnd') != ""){
                        whereSql += " and date_format(deal_time,'%Y-%m-%d %H:%i:%s') <= '"+searchMap.get('dealTimeEnd')+"'";
                    }
                }
                var sql = "select count(*) count from sys_customerinfo where 1=1"+whereSql+" and status='A'";
                connection.query(sql,function(err,results){
                    if(err){
                        console.log(err);
                        callback(err);
                    }else{
                        if(results.length>0){
                            callback(null,results[0].count);
                        }
                    }
                    connection.release();
                });
            }
        });
    },
    deleteCustomerInfo:function(id,callback){
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
                var sql ="update sys_customerinfo set status='X' where id="+id;
                connection.query(sql,function (err, results) {
                    if(err){
                        callback(err);
                    }else{
                        callback(null,results);
                    }
                    connection.release();
                })
            }
        });
    },
    getCustomerInfoById:function(id,callback){
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
                var sql = "select ID,CUSTOMER_ACCOUNT,TARGET_NAME,DATE_FORMAT(DEAL_TIME,'%Y-%m-%d %H:%i:%s') DEAL_TIME,DATE_FORMAT(CONNECT_TIME,'%Y-%m-%d %H:%i:%s') CONNECT_TIME ,PRODUCT_NAME,PRODUCT_PRICE," +
                    "ISDEAL,DEAL_TIMES,STORE_NAME,ISREPEAT,REPEAT_NAME from sys_customerinfo where id="+id+" and status='A'";
                connection.query(sql,function(err,results){
                   if(err){
                       callback(err);
                   } else{
                       callback(null,results);
                   }
                   connection.release();
                });
            }
        });
    },
    getPhotosByCustomerId:function(id,callback){
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection &&　'query' in connection){
                var sql ="select * from sys_photo where rela_customer_id="+id+" and status='A'";
                connection.query(sql,function(err,results){
                    if(err){
                        callback(err);
                    }else{
                        callback(null,results);
                    }
                });
            }
        });
    },
    savePhotos:function(list,callback){
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
                var sql = "insert into sys_photo(rela_customer_id,type,photo_name,photo_path,create_user_id,status) values ?";
                if(list != undefined && list.length>0){
                    connection.query("set names utf8;");
                    connection.query(sql,[list],function(err,results){
                        if(err){
                            callback(err);
                        }else{
                            callback(null,results);
                        }
                        connection.release();
                    });
                }
            }
        });
    },
    updateCustomerInfo:function(searchMap,userId,callback){
        global.sqlPool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else if(connection && 'query' in connection){
               var sql = "update sys_customerinfo set ";
               var valueSql = "";
               if(searchMap != null && searchMap.size>0){
                    if(searchMap.get('customer_account') != null && searchMap.get('customer_account') != ""){
                        valueSql += ",customer_account='"+searchMap.get('customer_account')+"'";
                    }
                    if(searchMap.get('target_name') != null && searchMap.get('target_name') != ""){
                        valueSql += ",target_name='"+searchMap.get('target_name')+"'";
                    }
                    if(searchMap.get('deal_time') != null && searchMap.get('deal_time') != ""){
                        valueSql += ",deal_time='"+searchMap.get('deal_time')+"'";
                    }
                    if(searchMap.get('connect_time') != null && searchMap.get('connect_time') != ""){
                        valueSql += ",connect_time='"+searchMap.get('connect_time')+"'";
                    }
                    if(searchMap.get('product_name') != null && searchMap.get('product_name') != ""){
                        valueSql += ",product_name='"+searchMap.get('product_name')+"'";
                    }
                    if(searchMap.get('product_price') != null && searchMap.get('product_price') != ""){
                        valueSql += ",product_price='"+searchMap.get('product_price')+"'";
                    }
                    if(searchMap.get('isDeal') != null && searchMap.get('isDeal')!=""){
                        valueSql += ",isDeal='"+searchMap.get('isDeal')+"'";
                    }
                    if(searchMap.get('deal_times') != null && searchMap.get('deal_times')!=""){
                        valueSql += ",deal_times="+searchMap.get('deal_times');
                    }
                    if(searchMap.get('isRepeat') != null && searchMap.get('isRepeat')!=""){
                        valueSql += ",isRepeat='"+searchMap.get('isRepeat')+"'";
                    }
                    if(searchMap.get('repeat_name') != null && searchMap.get('repeat_name')!=""){
                        valueSql += ",repeat_name='"+searchMap.get('repeat_name')+"'";
                    }
                    if(searchMap.get('store_name') != null && searchMap.get('store_name')!=""){
                        valueSql += ",store_name='"+searchMap.get('store_name')+"'";
                    }
                    sql = sql + valueSql.slice(1)+" where id="+searchMap.get('id');
                    connection.query(sql,function(err,results){
                        if(err){
                            callback(err);
                        }else{
                            callback(null,results);
                        }
                        connection.release();
                    });
                }
            }
        });
    }
};