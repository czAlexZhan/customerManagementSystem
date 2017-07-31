const customerInfoDao = require('../dao/CustomerInfoDao');

module.exports = {
    /**
     * 插入新纪录
     */
    insertCustomerInfo:function (list, callback) {
        customerInfoDao.insertCustomerInfo(list,callback);
    }
};