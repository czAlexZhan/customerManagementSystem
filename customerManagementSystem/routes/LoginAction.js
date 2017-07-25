var express = require('express');
var router = express.Router();
var loginService = require('../service/LoginService');
var md5Service = require('../service/MD5Service');

/*
post 数据
 */
var userName = "";
var password = "";

/* GET index page. */
router.get('/', function(req, res, next) {
    res.redirect('/login');
});
/* Get login page */
router.route('/login').get(function(req,res){
    if(!req.session.sys_user_id){
        res.render('login',{title:"用户登陆"});
    }else{
        res.redirect('/customerInfoAction');
    }

}).post(function(req,res){
    userName = req.body.userName;
    password = req.body.password;

    loginService.getUserInfoByUserName(userName,function (err,data) {
        if(err){
            console.log(err);
        }else{
            var userInfo = data[0];
            if(userInfo != undefined){
                //判断密码是否相同
                var Depassword = userInfo.USER_PASSWORD.toString();
                if(password == md5Service.aesDecrypt(Depassword,"zhanxw")){
                    req.session.sys_user_id = userInfo.SYS_USER_ID;
                    res.send(200,{flag:true,msg:"登陆成功"});
                }else{
                    res.send(200,{flag:false,msg:"登陆失败，密码错误"})
                }
            }else{
                res.send(200,{flag:false,msg:'此用户未注册'});
            }
        }

    });

router.post('/register',function (req, res) {
   userName = req.body.userName;
   password = req.body.password;
   //密码加密
    var encryptoPassword = md5Service.aesEncrypto(password,'zhanxw');
    loginService.registerUserInfo(userName,encryptoPassword,function (err, data) {
       if(err){
           console.log(err);
       }else{
           if(data == null){
               res.send(200,{msg:"此用户已存在"});
           }else{
               var insertId = data.insertId;
               if(insertId != undefined){
                   req.session.sys_user_id = insertId;
                   res.redirect('/login');
               }
           }
       }
    });

});
});
module.exports = router;
