const customerInfoDao = require('../dao/CustomerInfoDao');

module.exports = {
    /**
     * 插入新纪录
     */
    insertCustomerInfo:function (list, callback) {
        customerInfoDao.insertCustomerInfo(list,callback);
    },
    /**
     * 查询记录（分页）
     */
    findCustomerInfoList:function(searchMap,currentPage,pageSize,isPaging) {
        return new Promise((resolve,reject)=>{
            customerInfoDao.findCustomerInfoList(searchMap, currentPage, pageSize, isPaging,function(err,results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    },
    /**
     * 查询记录总数
     */
    findCustomerInfoListCount:function(searchMap){
        return new Promise((resolve ,reject)=>{
           customerInfoDao.findCustomerInfoCount(searchMap,function(err,results){
              if(err) return reject(err);
              resolve(results);
           });
        });
    }
};