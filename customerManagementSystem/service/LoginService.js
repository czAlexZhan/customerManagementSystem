var loginDao = require('../dao/LoginDao');

module.exports = {
  getUserInfoByUserName:function (userName,callback) {
    return loginDao.getUserInfoByUsername(userName,callback);
  }
};