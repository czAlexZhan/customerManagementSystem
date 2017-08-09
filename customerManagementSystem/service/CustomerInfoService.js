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
    },
    /**
     * 删除用户记录
     */
    deleteCustomerInfo:function(id,callback){
        customerInfoDao.deleteCustomerInfo(id,callback);
    },
    /**
     * 根据id获取用户记录
     */
    getCustomerInfoById:function(id,callback){
        customerInfoDao.getCustomerInfoById(id,callback);
    },
    /**
     * 根据记录id获取关联记录图片
     */
    getPhotosByCustomerId(id,callback){
        customerInfoDao.getPhotosByCustomerId(id,callback);
    }
};