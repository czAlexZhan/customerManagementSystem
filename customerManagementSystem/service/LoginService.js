var loginDao = require('../dao/LoginDao');

module.exports = {
    /*
        根据用户名获取用户信息
     */
  getUserInfoByUserName:function (userName,callback) {
    return loginDao.getUserInfoByUsername(userName,callback);
  },
  /*
        注册用户
   */
  registerUserInfo:function (userName, password,callback) {
      this.getUserInfoByUserName(userName,function (err, data) {
          if(err){
              console.log("registerUserInfo invoke getUserInfoByUserName err"+err);
              callback(err);
          }else{
              if(data.length > 0){
                  callback(null);
              }else{
                  return loginDao.registerUserInfo(userName,password,callback);
              }
          }
      })

  }

};