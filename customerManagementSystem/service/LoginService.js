var loginDao = require('../dao/LoginDao');

module.exports = {
  getUserInfoByUserName:function (name) {
    return loginDao.getUserInfoByUsername(name);
  }
};