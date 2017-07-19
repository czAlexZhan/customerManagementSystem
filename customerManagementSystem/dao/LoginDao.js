var sqlPool = require('../service/MysqlService');

module.exports = {
    getUserInfoByUserName:function (name) {
        sqlPool.getConnection(function (err, connection) {

        });
    }
};